const db = require('../../connection');

exports.viewMessage = (req, res, next) => {
    let id = req.params.id;
    let member = req.params.member;
    let sql = "SELECT * FROM usermessage_t WHERE usermessageID = ? AND staffID = ?";
    db.get().query(sql, [id, member], (err, result) => {
        if (err) return next(err);
        let dataDisplay = {
            name            :   result[0].name,
            email           :   result[0].email,
            subject         :   result[0].subject,
            message         :   result[0].message,
            date            :   result[0].date,
            time            :   result[0].time
        }
        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}
exports.messageList = (req, res, next) => {

    let sql = "SELECT * FROM usermessage_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"", data:result});
    });
}