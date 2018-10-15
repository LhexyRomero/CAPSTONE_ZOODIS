const db = require('../../connection');

/** @type {RequestHandler} */
module.exports = function (req, res, next) {
    let staffID = req.session.staffID;
    let sql = "SELECT journalID from staff_t WHERE staffID = ?";
    db.get().query(sql, [staffID], function (err, result) {
        if (err) return next(err);
        sql = "SELECT name,code, state, status FROM journal_t WHERE journalID = ?";
        db.get().query(sql, [result[0].journalID], function (er, journal) {
            if (er) return next(er);
            let state = journal[0].state;
            let status = journal[0].status;
            let code = journal[0].code;
            let name = journal[0].name;
            if (state == "noticed" && status == "Incomplete" && name != "none") {
                next();
            } 
            else if(state == "revised" && status =="Incomplete" && name != "none"){
                next();
            }
            else if(state == "notify" && status == "Incomplete" && name == "none"){
                res.status(200).send({ success: false, detail: "No Journal Assigned!" });
            }
            else {
                res.status(200).send({ success: false, detail: "No Journal Assigned!" });
            }
        });
    });
};