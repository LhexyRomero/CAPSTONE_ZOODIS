const db = require('../../connection');
const pdfReader = require('pdfreader').PdfReader;

exports.uploadJournal = (req, res, next) => {
    
    let file = req.file.path;

    if (!req.file) {
        res.status(200).send({ success: false, detail: "No Journal Provided!" });
        return;
    }

    let data = req.body;
    let name = data.name;
    let subject = data.subject;
    let message = data.message;
    let doi;
    let publishedDate;
    let status = "Incomplete";
    let state = "notify";
    let jState  = 1;
    let code = "RJ#" + Math.floor(Math.random() * 255);

    let checkJournal = function (cb) {
        checkJournalDate(file, function(err, entry){
            if(err) return next(err);
            doi = entry.doi;
            publishedDate = entry.published;

            if(!doi || !publishedDate) return cb(null, false, "No DOI/Published Date Found on file");

            new Promise((resolve, reject)=>{
                let sql = "SELECT * FROM journal_t WHERE doi = ?";
                db.get().query(sql, [doi], (err, result) => {
                    if (err) return reject(err);
        
                    if (result.length == 0) {
                        return resolve(true);
                    }
                    else {
                        return resolve(false);
                    }
                });
            }).then(passed=>{
                return new Promise((resolve, reject)=>{
                    if(passed){
                        let today = Date.parse('today');
    
                        for(let x=0; x<10; x++){
                            let yearMatch = (parseInt(today.toString('yyyy')) - x) + "";
                            if(publishedDate.match(yearMatch)){
                                resolve(yearMatch);
                                break;
                            };
                            if(x==9){
                                resolve(false);
                            }
                        }                    
                    }
                });
            }).then(passed=>{
                if(passed){
                    cb(null,passed);
                }
            }).catch(reason=>{
                throw new Error(reason.stack);
            }).catch(reason=>{
                cb(reason);
            });
        });
    }

    let insertJournal = function() {

        let sql = "INSERT INTO userjournal_t (jSubject,jMessage,jTitle,jDoi,jFile,staffID,jState,jPublished,jDateTime) VALUES (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql2 = "INSERT INTO journal_t (code,name,doi,status,file,state,ownedBy) VALUES (?,?,?,?,?,?,?)";
        db.get().query(sql,[subject,message,name,doi,file,req.session.staffID,jState,publishedDate],(err,result)=>{
            if(err) return next(err);
            db.get().query(sql2,[code,name,doi,status,file,state,req.session.staffID],(err2,result2)=>{
                if(err2) return next(err2);

                res.status(200).send({success: true, detail:"Successfully Submitted!"});
            });
        });
    }

    checkJournal((error,result, detail) =>{
        if(error) return next(error);

        if(result){
            publishedDate = result;
            insertJournal();
        }

        else {
            res.status(200).send({success: false, detail: detail || "Journal already Exists!"});
        }
    });
}

function checkJournalDate(path, cb){
    let error = 0;
    let done = 0; 
    let page1 = false; 
    let rows = {};
    let pages = [];

    let doi;
    let published;

    new pdfReader().parseFileItems(path, function(err, item){
        if(err) return error++;
        if(!item || item.page){
            processRows();
            rows = {};
        }else if(item.text){
            (rows[item.y] = rows[item.y] || []).push(item.text);
        }
    }); 

    function processRows() {
        let pageContent = [];
        new Promise((resolve, reject)=>{
            let sortedRows = Object.keys(rows) // => array of y-positions (type: float)
              .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)); // sort float positions
            sortedRows.forEach((y,i) => {
                let row = (rows[y] || []).join('');
                pageContent.push(row);
                if(i==sortedRows.length-1){
                    pages.push(pageContent);
                    resolve(pageContent);
                }
            });
        }).then(page=>{
            if(!page1){
                page1 = true;
                return new Promise((resolve, reject)=>{
                    let doiRegExp = new RegExp('doi', 'i');
                    let publishRegExp = new RegExp('published', 'i');
                    page.forEach((e,i)=>{
                        let doiIndex = e.search(doiRegExp);
                        let publishIndex = e.search(publishRegExp);
        
                        if(doiIndex != -1 && !doi){
                            doi = e.substring(doiIndex+3);
                            doi = doi.replace(':', '');
                            doi = doi.trim();
                        }
        
                        if(publishIndex != -1 && !published){
                            published = e.substring(publishIndex+9);
                            published = published.replace(':', '');
                            published = published.trim();
                        }
        
                        if(doi && published) done = 1;
        
                        if(i==page.length-1){
                            done = 2;
                            resolve({
                                doi: doi,
                                published: published
                            });
                        }
                    });
                });
            }
            return [];
        }).then(output=>{
            if(!Array.isArray(output)){
                cb(null,output);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            cb(reason);
        });
    }
}