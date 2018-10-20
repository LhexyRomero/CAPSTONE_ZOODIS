const fs = require('fs');
const db = require('../../connection');

exports.notiCard = (req,res,next) =>{

    let state = "noticed";
    let sql = "SELECT * FROM request_t WHERE state = ? AND staffID =? ORDER by dateTime DESC";
    db.get().query(sql,[state,req.session.staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
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