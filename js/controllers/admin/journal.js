const db = require('../../connection');

exports.addJournal = (req, res, next) => {
    console.log("andito akoo");

    let pdf = req.file.path;
    let data = req.body;
    let code = "ZDS#" + Math.floor(Math.random() * 255);
    let name = data.strJournalName;
    let doi = data.strDoi;
    let status = "Incomplete";
    let state = "notify";

    if (!req.file) {
        res.status(200).send({ success: false, detail: "No File Provided!" });
        return;
    }

    let checkJournal = (cb) => {

        let sql = "SELECT * FROM journal_t WHERE doi=?";
        db.get().query(sql, [doi], (err, result) => {
            if (err) return next(err);

            if (result.length == 0) {
                return cb(null, true);
            }
            else {
                return cb(null, false);
            }

        });


    }

    let insertJournal = () => {

        let sql = "INSERT INTO journal_t (code,name,doi,status,file,state) VALUES (?,?,?,?,?,?)";
        db.get().query(sql, [code, name, doi, status,pdf,state], (err, result) => {

            if (err) return next(err);

            res.status(200).send({ success: true, detail: "" });
        });


    }

    checkJournal((error, result) => {
        if (error) return next(error);
        if (result) {
            insertJournal();
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already Exists!", data: result });

        }
    });

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

    let sql = "SELECT * FROM journal_t WHERE status <> ?";
    db.get().query(sql,[status],(err,result) => {

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
        console.log(result);
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