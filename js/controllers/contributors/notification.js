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

    let state = "notify";
    let sql = "SELECT * FROM journal_t INNER JOIN staff_t ON journal_t.journalID = staff_t.journalID WHERE state =? AND staff_t.staffID=?";
    db.get().query(sql,[state,req.session.staffID],(err,result)=>{
        if(err) return next(err);

        console.log(result);
        

        res.status(200).send({success:true, detail:"Journal are ready to download!"});
    });
}
exports.setJournal = (req,res,next) =>{

    let state = "noticed";
    let sql = "";
}