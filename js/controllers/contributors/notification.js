const db = require('../../connection');

exports.notiCard = (req,res,next) =>{

    let state = "noticed";
    let sql = "SELECT * FROM notification_t WHERE state = ? AND staffID =?";
    db.get().query(sql,[state,req.session.staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.updateNotiCard = (req,res,next) =>{

    let id = req.params.id;
    let state = "read";
    let sql = "UPDATE notification_t SET state = ? WHERE notificationID = ?";
    db.get().query(sql,[state,id],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.notifyJournal = (req,res,next) =>{


    let sql = "SELECT journal_t.code,name, doi,file,state,status FROM journal_t LEFT JOIN staff_t ON journal_t.journalID = staff_t.journalID WHERE staff_t.staffID=?";
    db.get().query(sql,[req.session.staffID],(err,result)=>{
        if(err) return next(err);

        console.log(result);
        let dataDisplay = {
            code        : result[0].code,
            name        : result[0].name,
            file        : result[0].file,
            state       : result[0].state
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

    res.status(200).sendFile(fileName,{root: './public/others'});

}