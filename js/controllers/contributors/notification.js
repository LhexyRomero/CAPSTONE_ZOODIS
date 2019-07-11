const fs = require('fs');
const db = require('../../connection');

exports.notiCard = (req,res,next) =>{

    let state = "noticed";
    let sql = `SELECT * FROM 
                request_t 
               WHERE state = ? AND staffID =? 
               ORDER by dateTime DESC`;
    db.get().query(sql,[state,req.session.staffID],(err,result)=>{
        if(err) return next(err);
        console.log('notiCard', result.length);

        res.status(200).send({success:true, detail:"", data:result, noti: result.length});
    });
}

exports.updateNotiCard = (req,res,next) =>{

    let id = req.params.id;
    let state = "read";
    let sql = "UPDATE request_t SET state = ? WHERE requestID = ?";
    db.get().query(sql,[state,id],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.notifyJournal = (req,res,next) =>{

    let sql = "SELECT journal_t.code,name,message, doi,file,state,journal_t.status FROM journal_t LEFT JOIN staff_t ON journal_t.journalID = staff_t.journalID WHERE staff_t.staffID=?";
    db.get().query(sql,[req.session.staffID],(err,result)=>{
        if(err) return next(err);

        let dataDisplay = {
            code        : result[0].code,
            name        : result[0].name,
            file        : result[0].file,
            state       : result[0].state,
            status      : result[0].status,
            message     : result[0].message
        }
        res.status(200).send({success:true, detail:"Journal are ready to download!",data:dataDisplay});
    });
}
exports.setJournal = (req,res,next) =>{

    let state = "noticed";
    let sql = "UPDATE journal_t LEFT JOIN staff_t ON journal_t.journalID = staff_t.journalID SET state=? WHERE staff_t.staffID =?";
    db.get().query(sql,[state,req.session.staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"Journal Successfully Set!"});
    });

}

exports.downloadJournal = (req,res,next) =>{
    let fileName = req.params.filename;
    fs.readFile( __dirname + '/../../public/others/' + fileName, function(err, buffer){
        if(err) return next(err);
        res.setHeader('Content-Type', 'Application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=journal.pdf');
        res.status(200).send(buffer);
    });
}

exports.finishedJournal = (req,res,next) =>{

    let status = "completed";
    let state = "noticed";
    let sql = "UPDATE journal_t LEFT JOIN staff_t ON journal_t.journalID = staff_t.journalID SET journal_t.state = ? ,journal_t.status=? WHERE staff_t.staffID =?";
    db.get().query(sql,[state,status,req.session.staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"Journal Successfully Completed!"});
    });

}

exports.modalDisease = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;

    let sql3 = "SELECT * FROM disease_t WHERE diseaseID = ?";
    db.get().query(sql3, [id], (err3, result3) => {
        if (err3) return next(err3);

        let splittedSymptoms = result3[0].symptoms.split(":");
        let splittedBody    =   result3[0].bodySite.split(":");
        let dataDisplay = {

            diseaseName: result3[0].diseaseName,
            diseaseDesc: result3[0].diseaseDesc,
            symptoms: splittedSymptoms,
            bodySite:  splittedBody,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.selectDisease = (req, res, next) => {

    let sql = "SELECT diseaseID, diseaseName FROM disease_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.modalPrevention = (req, res, next) => {
    let id = req.params.id;

    let sql3 = "SELECT * FROM prevention_t INNER JOIN disease_t ON prevention_t.diseaseID = disease_t.diseaseID WHERE preventionID = ?";
    db.get().query(sql3, [id], (err3, result3) => {
        if (err3) return next(err3);

        let splittedPreventions = result3[0].preventions.split(":");
        let dataDisplay = {

            diseaseID: result3[0].diseaseID,
            diseaseName: result3[0].diseaseName,
            preventions: splittedPreventions,
        }

        console.log(result3);

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.reSubmitDisease = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let status = "pending";
    let state = "notify";
    let category = "Disease";
    let message = "";
    let sql = "UPDATE disease_t SET diseaseName = ?, diseaseDesc = ?, bodySite = ?,symptoms = ?,status=? WHERE diseaseID = ?";
    let sql2 = "UPDATE request_t SET state =?,status =? ,message=? WHERE category =? AND addedID =? ";
    let error = 0;

    //Some validations here... 
    let queryData = [];
    queryData.push(data.modalName);
    queryData.push(data.modalDesc);
    queryData.push(data.bodySite);
    queryData.push(data.symptoms);
    queryData.push("pending");
    queryData.push(id);

    queryData.forEach((e) => {
        if (e == undefined || e == null) {
            error++;
        }
    });
    console.log(queryData);

    if (error == 0) {
        db.get().query(sql, queryData, function (err, result) {
            if (err) return next(err);
            db.get().query(sql2, [state, status,message, category, id], (err2, result2) => {
                if (err2) return next(err2);
                res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });
            });
        });
    } else {
        res.status(200).send({ success: false, detail: "Invalid Data" });
    }
}

exports.reSubmitPrevention = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    let status = "pending";
    let state = "notify";
    let category = "Prevention";
    let message = "";
    let sql = "UPDATE prevention_t SET diseaseID = ?,  preventions = ?, status = ? WHERE preventionID = ?";
    let sql1 = "UPDATE request_t SET state =?,status =?, message=? WHERE category =? AND addedID =? ";
    let error = 0;

    //Some validations here... 
    let queryData = [];
    queryData.push(data.selectDisease);
    queryData.push(data.preventions);
    queryData.push("approved");
    queryData.push(id);

    queryData.forEach((e) => {
        if (e == undefined || e == null) {
            error++;
        }
    });

    if (error == 0) {
        db.get().query(sql, queryData, function (err, result) {
            if (err) return next(err);
            db.get().query(sql1, [state, status, message,category, id], (err1, result1) => {
                if (err1) return next(err1);

                res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });
            });
        });
    } else {
        res.status(200).send({ success: false, detail: "Invalid Data" });
    }
}
