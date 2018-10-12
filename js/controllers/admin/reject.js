const db = require('../../connection');

exports.rejectList = (req, res, next) => {
    let status = "rejected";

    let sql = "SELECT * FROM request_t WHERE status = ?";
    db.get().query(sql, [status], (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}
