const db = require('../../connection');

exports.notiCard = (req,res,next) =>{

    let state = "noticed";
    let sql = "SELECT * FROM notification_t WHERE state = ?";
    db.get().query(sql,[state],(err,result)=>{
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