const db = require("../../connection");

exports.toSelectBacteriaDisease = (req,res,next) =>{

    console.log("DITO AKO");
    let sql = "SELECT * FROM bacteria_t"
    db.get().query(sql,(err,result)=>{
        res.status(200).send({success: true, detail:"", data:result});
    });
}

exports.toSelectJournalDisease = (req,res,next) =>{
    let sql = "SELECT * FROM journal_t";
    db.get().query(sql,(err,result)=>{

        res.status(200).send({success: true, detail:"", data:result});
    });
}

exports.addDisease = (req, res, next) => {


    let data = req.body;
    let bacteriumID = data.selectBacteria;
    let diseaseName = data.strDiseaseName;
    let diseaseDesc = data.strDiseaseDesc;
    let journal = data.selectJournal;
    let status = "pending";
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;
    let symptoms = data.strSymptoms == null ? "" : data.strSymptoms == undefined ? "" : data.strSymptoms;
    let category = 'Disease';
    let state = "notify";

    symptoms += (data.symptoms0 == null || data.symptoms0 == undefined) ? "" : ":" + data.symptoms0;
    symptoms += (data.symptoms1 == null || data.symptoms1 == undefined) ? "" : ":" + data.symptoms1;
    symptoms += (data.symptoms2 == null || data.symptoms2 == undefined) ? "" : ":" + data.symptoms2;
    symptoms += (data.symptoms3 == null || data.symptoms3 == undefined) ? "" : ":" + data.symptoms3;
    symptoms += (data.symptoms4 == null || data.symptoms4 == undefined) ? "" : ":" + data.symptoms4;
    symptoms += (data.symptoms5 == null || data.symptoms5 == undefined) ? "" : ":" + data.symptoms5;
    symptoms += (data.symptoms6 == null || data.symptoms6 == undefined) ? "" : ":" + data.symptoms6;
    symptoms += (data.symptoms7 == null || data.symptoms7 == undefined) ? "" : ":" + data.symptoms7;
    symptoms += (data.symptoms8 == null || data.symptoms8 == undefined) ? "" : ":" + data.symptoms8;

    let checkDisease = function (cb) {
        let sql = "SELECT diseaseName, bacteriadisease_t.bacteriumID ,disease_t.journalID FROM disease_t INNER JOIN bacteriadisease_t ON disease_t.diseaseID = bacteriadisease_t.diseaseID INNER JOIN journal_t ON journal_t.journalID = disease_t.journalID WHERE diseaseName = ? AND bacteriadisease_t.bacteriumID = ? AND disease_t.journalID = ?";
        db.get().query(sql, [diseaseName,bacteriumID,req.session.staffData.journalID], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, true);
            }
            else {
                return cb(null, false);
            }
        });
    }
    
    
    let insertDisease = function () {
        let sql1 = "INSERT INTO disease_t (diseaseName,diseaseDesc,symptoms,journalID,status,staffID,date) VALUES (?,?,?,?,?,?,CURRENT_DATE)";
        let sql2 = "INSERT INTO bacteriadisease_t (bacteriumID,diseaseID) VALUES (?,?)";
        let sql = "INSERT INTO notification_t (dateTime, status, staffName, addedData, staffID, category,addedID,state) VALUES (CURRENT_DATE,?,?,?,?,?,?,?)";
        db.get().query(sql1, [diseaseName, diseaseDesc, symptoms,req.session.staffData.staffID,status,req.session.staffID], (err1, result1) => {
            if(err1) return next(err1);
                db.get().query(sql2,[bacteriumID,result1.insertId],(err,result) => {
                    if (err) return next(err);
                        db.get().query(sql, [ status, name, diseaseName, req.session.staffID, category,result1.insertId,state],(err2, result2) => {
                            if (err2) return next(err2);
                            res.status(200).send({success: true, detail: ""}); 
                        });    
                });
        });
    }

    checkDisease((error, result) => {
        if (error) return next(error);

        if (result) {
            insertDisease();
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already exists!" });
        }
    });
}

exports.diseaseList = (req,res,next) =>{

    let sql = "SELECT * FROM disease_t WHERE staffID = ?";
    db.get().query(sql,[req.session.staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.viewDisease = (req,res,next) => {
    let id = req.params.id;
    let data = req.body;

    let sql = "SELECT * FROM disease_t INNER JOIN bacteriadisease_t ON disease_t.diseaseID = bacteriadisease_t.diseaseID INNER JOIN bacteria_t ON bacteriadisease_t.bacteriumID = bacteria_t.bacteriumID INNER JOIN journal_t ON journal_t.journalID = disease_t.journalID WHERE disease_t.diseaseID = ?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);

        let splittedSymptoms = result[0].symptoms.split(":");
        console.log(splittedSymptoms);
        let dataDisplay = {
            
            bacteriumID     : result[0].bacteriumID,
            bacteriumName   : result[0].bacteriumScientificName,
            diseaseName     : result[0].diseaseName,
            diseaseDesc     : result[0].diseaseDesc,
            title           : result[0].name,
            symptoms        : splittedSymptoms,
        }

        res.status(200).send({success: true, detail :"", data:dataDisplay});
    });
}