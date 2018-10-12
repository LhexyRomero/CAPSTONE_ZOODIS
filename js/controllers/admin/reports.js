const db = require('../../connection');
const pdf = require('../../pdfGenerator');

exports.generateReports = function(req, res, next){
    let date = req.query.date || Date.parse('now').toString('yyyy-MM-dd');
    let freq = req.query.freq || 3;

    gatherData(date, freq).then(data=>{
        data.date = Date.parse('now').toString('MMM dd, yyyy');
        return generate(data).then(buffer=>{
            return buffer;
        });
    }).then(buffer=>{
        res.set('Content-disposition', 'attachment; filename=reports.pdf');
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

       Promise.all([
           getTotal('userjournal_t','jDateTime'),
           getTotal('animal_t','dateTime'),
           getTotal('bacteria_t','dateTime'),
           getTotal('disease_t','dateTime'),
       ]).then(results=>{
            resolve({
                journal:{
                    total: results[0].total,
                    week: results[0].week,
                    month: results[0].month,
                    year: results[0].year,
                },
                animal:{
                    total: results[1].total,
                    week: results[1].week,
                    month: results[1].month,
                    year: results[1].year,
                },
                bacteria:{
                    total: results[2].total,
                    week: results[2].week,
                    month: results[2].month,
                    year: results[2].year,
                },
                disease:{
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

function getTotal(table, field){
    let dateNow = Date.parse('now').toString('yyyy-MM-dd HH:mm:ss');
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