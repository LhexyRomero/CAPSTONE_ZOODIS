const db = require("../connection");

exports.addBacteriaTaxon = (req, res, next) => {
    let data = req.body;

    let strPhylum = data.strPhylum;
    let strClass = data.strClass;
    let strOrder = data.strOrder;
    let strFamily = data.strFamily;
    let strGenus = data.strGenus;
    let strSpecies = data.strSpecies;
    let status = 'pending';
    let journal = data.selectJournal;

    let insertBacteriaTaxon = function () {
        let sql = "INSERT INTO bacteriataxo_t (phylum, class, orderr, family, genus, species,status,journalID) VALUES (?,?,?,?,?,?,?,?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies,status,journal], (err, result) => {
            if (err) return next(err);

            res.status(200).send({ success: true, detail: "Successfuly Submitted to Admin!", data: result });
        });
    }

    let checkBacteriaTaxon = function (cb) {
        let sql = "SELECT genus, species, bacteriataxo_t.journalID FROM bacteriataxo_t INNER JOIN journal_t ON bacteriataxo_t.journalID=journal_t.journalID WHERE species = ? AND genus = ? AND bacteriataxo_t.journalID = ?";
        db.get().query(sql, [strSpecies,strGenus,journal], (err, result) => {
            if (err) return cb(err);


            if (result.length == 0) {
                return cb(null, true);
            }
            else {
                return cb(null, false);
            }
        });
    }

    checkBacteriaTaxon((error, result) => {
        if (error) return next(error);

        if (result) {
            insertBacteriaTaxon();
        }

        else {
            res.status(200).send({ success: false, detail: "Data Already Exists" })
        }
    });


}

exports.bacteriaTaxonList = (req,res,next) =>{
    let sql = "SELECT * FROM bacteriataxo_t";

    db.get().query(sql,(err,result)=>{
        if (err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.viewBacteriaTaxon = (req,res,next) =>{
    let id = req.params.id;

    let sql = "SELECT * FROM bacteriataxo_t INNER JOIN journal_t ON bacteriataxo_t.journalID = journal_t.journalID WHERE bacteriumTaxoID = ?";
    db.get().query(sql,[id],(err,result)=>{

        let dataDisplay = {
            phylum          : result[0].phylum,
            classs          : result[0].class,
            order           : result[0].orderr,
            family          : result[0].family,
            genus           : result[0].genus,
            species         : result[0].species,
            status          : result[0].status,
            title           : result[0].name
        }

        res.status(200).send({success: true, detail:"", data:dataDisplay});
    });
}

exports.addToxin = (req, res, next) => {

    let data = req.body;
    let selectBacteria  = data.selectBacteria2;
    let strToxinName = data.strToxinName;
    let strStructureFeature = data.strStructureFeature;
    let strFunction = data.strFunction;
    let status = "pending";

    let checkToxin = function (cb) {
        let sql = "SELECT * FROM toxin_t WHERE name =?"; //undecided
        db.get().query(sql, [strToxinName], (err5, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, true);
            }

            else {
                return cb(null, false);
            }
        });
    }

    let insertToxin = function () {
        let sql = "INSERT INTO toxin_t (name,structureFeature,function,status) VALUES (?,?,?,?)";
        let sql1 = "INSERT INTO bacteriatoxin_t (bacteriumID,toxinID) VALUES (?,?)";
        db.get().query(sql, [strToxinName, strStructureFeature, strFunction,status], (err, result) => {
            if (err) return next(err);
            db.get().query(sql1,[selectBacteria,result6.insertId],(err1,result1)=>{
                if(err1) return next (result1);

                res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!"});
            });
        });
    }

    checkToxin((error, result) => {
        if (error) return next(error);

        if (result) {
            insertToxin();
        }

        else {
            res.status(200).send({ success: false, detail: "Data Already Exists" })
        }
    });

}

exports.toSelectBacteria = (req, res, next) => {
    let sql10 = "SELECT animalID, animalName FROM animal_t";
    db.get().query(sql10, (err10, result10) => {
        if (err10) return next(err10);

        res.status(200).send({ success: true, detail: "", data: result10 });
    });
}

exports.toSelectJournal = (req,res,next) =>{
    let sql = "SELECT journalID, code FROM journal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result});
    });
}