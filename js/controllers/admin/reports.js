const db = require('../../connection');
const pdf = require('../../pdfGenerator');

exports.generateReports = function(req, res, next){
    let data = req.body;
    let month = data.selectMonth || req.query.month;
    let year = data.selectYear || req.query.year;
    let date = req.query.date || Date.parse(Date.parse(month + " month").toString('MMM ') + year) || Date.parse('now').toString('yyyy-MM-dd');
    let freq = req.query.freq || 3;

    gatherData(date, freq).then(data=>{
        data.date = Date.parse('now').toString('MMM dd, yyyy');
        return generate(data).then(buffer=>{
            return buffer;
        });
    }).then(buffer=>{
        // res.set('Content-disposition', 'attachment; filename=reports.pdf');
        res.set('Content-Type', 'Application/pdf');
        res.status(200).send(buffer);
    }).catch(next);
}

function gatherData(date, freq, cb){
    return new Promise((resolve, reject)=>{
       if(!cb){
           cb = (err, data) => {
                if(err) return reject(err);
                resolve(data);
           }
       } 

       let dateRange = [date.toString('yyyy-MM-dd 00:00:00'), date.addMonths(1).addDays(-1).toString('yyyy-MM-dd 23:59:59')];

       Promise.all([
           getTotal('userjournal_t','jDateTime'),
           getTotal('animal_t','dateTime'),
           getTotal('bacteria_t','dateTime'),
           getTotal('disease_t','dateTime'),
       ]).then(results=>{
            return new Promise((res,rej)=>{
                let journalSql = "SELECT j.*, uj.jDateTime FROM `userjournal_t` uj, journal_t j WHERE uj.jDoi = j.doi AND uj.jDateTime BETWEEN ? AND ?";
                let journalYearSql = "SELECT jPublished, COUNT(userjournalID) as journCount FROM userjournal_t GROUP BY jPublished";
                let animalSql = "SELECT COUNT(*) as 'reportCount' FROM animal_t WHERE journalID = ?";
                let bacteriaPathoSql = "SELECT COUNT(*) as 'reportCount' FROM bacteria_t WHERE journalID = ? AND pathogenic = 1";
                let bacteriaNonPathoSql = "SELECT COUNT(*) as 'reportCount' FROM bacteria_t WHERE journalID = ? AND pathogenic = 0";
                let diseaseSql = "SELECT COUNT(*) as 'reportCount' FROM disease_t WHERE journalID = ?";
                
                queryReport(journalSql, dateRange).then(journals=>{
                    return queryReport(journalYearSql,[]).then(journalsYear=>{
                        results.push(journalsYear);
                        return journals;
                    });
                }).then(journals=>{
                    var records = {
                        journal: journals,
                        animal:[],
                        bacteriaPatho:[],
                        bacteriaNonPatho:[],
                        disease:[],
                    };
                    if(journals.length == 0){
                        results.push(records);
                        res(results);
                        return 
                    } 
                    var promises = [];
                    journals.forEach((element,index) => {
                        promises.push(new Promise((ok, not)=>{
                            queryReport(animalSql, [element.journalID]).then(animalRes=>{
                                records.animal.push({
                                    journalName: element.name,
                                    animalCount: animalRes[0].reportCount
                                });
                                ok();
                            });
                        })); 
                        promises.push(new Promise((ok, not)=>{
                            queryReport(diseaseSql, [element.journalID]).then(diseaseRes=>{
                                records.disease.push({
                                    journalName: element.name,
                                    diseaseCount: diseaseRes[0].reportCount
                                });
                                ok();
                            });
                        })); 
                        promises.push(new Promise((ok, not)=>{
                            queryReport(bacteriaPathoSql, [element.journalID]).then(bac1Res=>{
                                records.bacteriaPatho.push({
                                    journalName: element.name,
                                    bacteriaCount: bac1Res[0].reportCount
                                });
                                ok();
                            });
                        })); 
                        promises.push(new Promise((ok, not)=>{
                            queryReport(bacteriaNonPathoSql, [element.journalID]).then(bac2Res=>{
                                records.bacteriaNonPatho.push({
                                    journalName: element.name,
                                    bacteriaCount: bac2Res[0].reportCount
                                });
                                ok();
                            });
                        })); 

                        if(index == journals.length-1){
                            Promise.all(promises).then(trash=>{
                                results.push(records);
                                res(results);
                            });
                        }
                    });
                });
            });
       }).then(results=>{
            resolve({
                journal:{
                    records: results[5].journal,                  
                    recordsYear: results[4],                  
                    total: results[0].total,
                    week: results[0].week,
                    month: results[0].month,
                    year: results[0].year,
                },
                animal:{
                    records: results[5].animal,
                    total: results[1].total,
                    week: results[1].week,
                    month: results[1].month,
                    year: results[1].year,
                },
                bacteria:{
                    records2: results[5].bacteriaNonPatho,
                    records1: results[5].bacteriaPatho,
                    total: results[2].total,
                    week: results[2].week,
                    month: results[2].month,
                    year: results[2].year,
                },
                disease:{
                    records: results[5].disease,
                    total: results[3].total,
                    week: results[3].week,
                    month: results[3].month,
                    year: results[3].year,
                },
            });
       });
    });
}

function generate(data, cb){
    return new Promise((resolve, reject)=>{
       if(!cb){
           cb = (err, data) => {
                if(err) return reject(err);
                resolve(data);
           }
       } 

       pdf.generatePDF( __dirname  + '/../../views/admin/reports.ejs', data, 'buffer', function(err, buffer){
           if(err) return cb(err);
           cb(null, buffer);
       });
    });
}

function getTotal(table, field, date){
    let dateNow = Date.parse(date || 'now').toString('yyyy-MM-dd HH:mm:ss');
    return new Promise((resolve, reject)=>{
        let sql = "SELECT COUNT(*) as 'tally' FROM " + table;
        let start;
        db.get().query(sql, function(err, count){
            if(err) return reject(err);
            sql = "SELECT COUNT(*) as 'tally' FROM " + table + " WHERE " + field+ " BETWEEN ? AND ?";
            start = Date.parse('last week').toString('yyyy-MM-dd');
            db.get().query(sql, [start, dateNow], function(err, week){
                if(err) return reject(err);
                start = Date.parse('last month').toString('yyyy-MM-dd');
                db.get().query(sql, [start, dateNow], function(err, month){
                    if(err) return reject(err);
                    start = Date.parse('last year').toString('yyyy-MM-dd');
                    db.get().query(sql, [start, dateNow], function(err, year){
                        if(err) return reject(err);
                        resolve({
                            total: count[0].tally,
                            week: week[0].tally,
                            month: month[0].tally,
                            year: year[0].tally,
                        });
                    });
                });
            });
        });
    });
}

function queryReport(sql,params){
    return new Promise((resolve,reject)=>{
        db.get().query(sql, params, function(err, results){
            if(err) return reject(err);
            resolve(results);
        });
    });
}