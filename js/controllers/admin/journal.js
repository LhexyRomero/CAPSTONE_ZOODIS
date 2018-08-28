const db = require('../../connection');

exports.addJournal = (req, res, next) => {
    console.log("andito akoo");

    let pdf = req.file.path;
    let data = req.body;
    let code = data.strJournalCode;
    let name = data.strJournalName;
    let doi = data.strDoi;
    let status = "Incomplete";
    let state = "notify";
    let message = "Assigned journal is ready to download!";

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

        let sql = "INSERT INTO journal_t (code,name,doi,status,file,state,message) VALUES (?,?,?,?,?,?,?)";
        db.get().query(sql, [code, name, doi, status,pdf,state,message], (err, result) => {

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

    let sql = "SELECT * FROM journal_t";
    db.get().query(sql, (err, result) => {

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
    let data = req.body;

    let sql3 = "SELECT * FROM journal_t WHERE journalID = ?";
    db.get().query(sql3, [id], (err3, result3) => {
        if (err3) return next(err3);

        let dataDisplay = {

            code: result3[0].code,
            name: result3[0].name,
            doi: result3[0].doi,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.toSelectStaffName = (req, res, next) => {

    let sql = "SELECT * FROM staff_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.toSelectJournal = (req, res, next) => {

    let status = "Incomplete";
    let sql = "SELECT * FROM journal_t WHERE status = ?";
    db.get().query(sql,[status],(err, result) => {
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
    let message = "Assigned journal is ready to download!";

    console.log(data);

    let sql = "UPDATE staff_t LEFT JOIN journal_t ON staff_t.journalID = journal_t.journalID SET staff_t.journalID = ?, journal_t.status = ?, journal_t.state=?, journal_t.message=? WHERE staffID =?";
    db.get().query(sql,[journalID,status,state,message,staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"Journal Successfully Assigned!"});
    });
}