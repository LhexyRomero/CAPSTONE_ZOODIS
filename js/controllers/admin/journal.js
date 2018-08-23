
const db = require('../../connection');

exports.addJournal = (req, res, next) => {
    let data = req.body;
    let code = data.strJournalCode;
    let name = data.strJournalName;
    let doi = data.strDoi;
    let status = "Incomplete";

    let checkJournal = (cb) => {
        let sql = "SELECT * FROM journal_t WHERE doi=?";
        db.get().query(sql, [doi], (err, result) => {
            if (err) return next(err);

            if (result.length == 0) {
                return cb(null, true);
            }
            else {
                return cb(null, false);
            }

        });
    }

    let insertJournal = () => {
        let sql = "INSERT INTO journal_t (code,name,doi,status) VALUES (?,?,?,?)";
        db.get().query(sql, [code, name, doi, status], (err, result) => {
            if (err) return next(err);
            res.status(200).send({ success: true, detail: "" });
        });
    }

    checkJournal((error, result) => {
        if (error) return next(error);
        if (result) {
            insertJournal();
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already Exists!", data: result });

        }
    });

}

exports.journalList = (req, res, next) => {

    let sql = "SELECT * FROM journal_t";
    db.get().query(sql, (err, result) => {

        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}