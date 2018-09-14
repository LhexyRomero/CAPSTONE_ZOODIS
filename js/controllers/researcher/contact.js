const db = require('../../connection');

exports.collabMessage = (req,res,next) =>{

    let data = req.body;
    let subject = data.subject;
    let message = data.message;
    let state = 1;

    let sql = "INSERT INTO usermessage_t (subject,message,state,staffID) VALUES (?,?,?,?)";
    db.get().query(sql,[subject,message,state,req.session.staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"Message Sent!"});
    });
}