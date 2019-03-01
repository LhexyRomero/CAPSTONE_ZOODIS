const db = require('../../connection');
const pdfReader = require('pdfreader').PdfReader;

exports.addJournal = (req, res, next) => {

    let file = req.file.path;
    let data = req.body;
    let code = "ZDS#" + Math.floor(Math.random() * 255);
    let name = data.strJournalName;
    let doi;
    let publishedDate;
    let status = "Incomplete";
    let state = "notify";

    if (!req.file) {
        res.status(200).send({ success: false, detail: "No File Provided!" });
        return;
    }

    let checkJournal = (cb) => {
        checkJournalDate(file, (err,entry)=>{
            if(err) return next(err);
            doi = entry.doi;
            publishedDate = entry.published;

            if(!doi || !publishedDate) return cb(null, false, "No DOI/Published Date Found on file");

            new Promise((resolve,reject)=>{
                let sql = "SELECT * FROM journal_t WHERE doi=?";
                db.get().query(sql, [doi], (err, result) => {
                    if (err) return next(err);

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
                    else {
                        resolve(false);
                    }
                });
            }).then(passed=>{
                if(passed){
                    console.log("IM HERE PASSED FOR CHECK JOURNAL");
                    cb(null,passed);
                }
                else {
                    cb(null,null); 
                    console.log("IM HERE");
                }
            }).catch(reason=>{
                console.log("IM HERE REASON STACK FOR CHECK JOURNAL");
                throw new Error(reason.stack);
            }).catch(reason=>{
                
                console.log("IM HERE REASON FOR CHECK JOURNAL");
                cb(reason);
            });
        });
    }

    let insertJournal = () => {

        let sql = "INSERT INTO journal_t (code,name,doi,status,file,state) VALUES (?,?,?,?,?,?)";
        db.get().query(sql, [code, name, doi, status,file,state], (err, result) => {

            if (err) return next(err);

            res.status(200).send({ success: true, detail: "" });
        });


    }

    checkJournal((error,result, detail) =>{
        console.log("THE FINAL RESULT",result);
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
                    console.log(page);
                    let doiRegExp = new RegExp('doi', 'i');
                    let publishRegExp = new RegExp('published', 'i');
                    page.forEach((e,i)=>{
                        let doiIndex = e.search(doiRegExp);
                        let publishIndex = e.search(publishRegExp);
        
                        if(doiIndex != -1 && !doi){
                            doi = e.substring(doiIndex+3);
                            doi = doi.replace(':', '');
                            doi = doi.trim();

                            console.log(doi);
                        }
        
                        if(publishIndex != -1 && !published){
                            published = e.substring(publishIndex+9);
                            published = published.replace(':', '');
                            published = published.trim();

                            console.log(published);
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

exports.updateJournal = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;

    let strJournalCode = data.modalJournalCode;
    let strJournalName = data.modalJournalName;
    let strDoi = data.modalDoi;

    let sql = ('UPDATE journal_t SET code=?, name=?, doi=? WHERE journalID=?');
    db.get().query(sql, [strJournalCode, strJournalName, strDoi, id], (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "Successfully Updated!" });
    });
}

exports.journalList = (req, res, next) => {
    let status = "none";

    let sql = "SELECT * FROM journal_t WHERE status <> ? AND name <> ?";
    db.get().query(sql,[status,status],(err,result) => {

        if (err) return next(err);
        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.editJournal = (req, res, next) => {

    let id = req.params.id;

    let sql7 = "SELECT * FROM journal_t WHERE journalID = ?";
    db.get().query(sql7, [id], (err7, result7) => {
        if (err7) return next(err7);

        let dataDisplay = {
            code: result7[0].code,
            name: result7[0].name,
            doi: result7[0].doi,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });

}

exports.viewJournal = (req, res, next) => {
    let id = req.params.id;

    let sql3 = "SELECT code, name, doi FROM journal_t WHERE journalID = ?";
    db.get().query(sql3, [id], (err3, result3) => {
        if (err3) return next(err3);
        let dataDisplay = {

            code: result3[0].code,
            name: result3[0].name,
            doi: result3[0].doi
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.toSelectStaffName = (req, res, next) => {
    let type = 1;
    let journalID = 0;
    let newAccount = 10;

    let sql = "SELECT * FROM staff_t WHERE type =? AND journalID = ? OR journalID = ?";
    db.get().query(sql,[type,journalID,newAccount],(err, result) => {
        if (err) return next(err);
        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.toSelectJournal = (req, res, next) => {

    let status = "Incomplete";
    let assign = 0;
    let name = "none";
    let sql = "SELECT * FROM journal_t WHERE status = ? AND name <> ? AND assign = ?";
    db.get().query(sql,[status,name,assign],(err, result) => {
        if (err) return next(err);
        
        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.assignedJournal = (req,res,next) =>{

    let data = req.body;
    let staffID = data.selectStaffName;
    let journalID = data.selectJournalName;
    let state = "notify";
    let status = "Incomplete"
    let assign = 1;
    let sql = "UPDATE staff_t LEFT JOIN journal_t ON staff_t.journalID = journal_t.journalID SET staff_t.journalID = ?, journal_t.status = ?, journal_t.state=? WHERE staffID =?";
    let sql1 = "UPDATE journal_t SET assign = ? WHERE journalID = ?";
    
    db.get().query(sql,[journalID,status,state,staffID],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[assign,journalID],(err1,result1)=>{
            if(err1) return next(result1);

            res.status(200).send({success: true, detail:"Journal Successfully Assigned!"});
        });
    });
}

exports.journalAssignee = (req,res,next) =>{

    let id = 10;
    let type = 1;
    let sql = "SELECT firstName, lastName,middleInitial,name FROM staff_t INNER JOIN journal_t ON staff_t.journalID = journal_t.journalID WHERE journal_t.journalID <> ? AND staff_t.type = ?";

    db.get().query(sql,[id,type],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"" ,data:result});
    });
}