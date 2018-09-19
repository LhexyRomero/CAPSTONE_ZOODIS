const db = require('../../connection');

exports.viewMessage = (res, req, next) => {
    let id = req.params.id;
    let sql = "SELECT * FROM usermessage_t WHERE usermessageID = ? AND staffID = ?";
    db.get().query(sql, [id, req.session.id], (err, result) => {
        if (err) return next(err);

        let datadisplay = {
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