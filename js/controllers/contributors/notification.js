const db = require('../../connection');

exports.notiCard = (req,res,next) =>{

    let state = "noticed";
    let sql = "SELECT * FROM notification_t WHERE state = ?";
    db.get().query(sql,[state],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}