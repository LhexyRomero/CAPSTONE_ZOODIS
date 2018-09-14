const db = require('../../connection');


exports.uploadJournal = (req, res, next) => {
    
    let file = req.file.path;

    if (!req.file) {
        res.status(200).send({ success: false, detail: "No Journal Provided!" });
        return;
    }

    let data = req.body;
    let name = data.name;
    let doi = data.doi;
    let state = 1; //notify

    let checkJournal = function (cb) {
        let sql = "SELECT * FROM journal_t WHERE doi = ?";
        db.get().query(sql, [doi], (err, result) => {
            if (err) return next(err);

            if (result.length == 0) {
                return cb(null, true);
            }
            else {
                return cb(null,false);
            }
        });
    }

    let insertJournal = function() {
        let sql = "INSERT INTO userjournal_t (title,doi,file,staffID,state) VALUES (?,?,?,?,?)";
        db.get().query(sql,[name,doi,file,req.session.staffID,state],(err,result)=>{
            if(err) return next(err);

            res.status(200).send({success: true, detail:"Successfully Submitted!"});
        });
    }

    checkJournal((error,result) =>{
        if(error) return next(error);

        if(result){
            insertJournal();
        }

        else {
            res.status(200).send({success: false, detail:"Journal already Exists!"});
        }
    });
}