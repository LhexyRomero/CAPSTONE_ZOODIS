const db = require("../connection");

exports.addAnimalTaxon = (req, res, next) => {

    let data = req.body;

    let strPhylum = data.strPhylum;
    let strClass = data.strClass;
    let strOrder = data.strOrder;
    let strFamily = data.strFamily;
    let strGenus = data.strGenus;
    let strSpecies = data.strSpecies;
    let status = "pending";
    let strJournal = data.selectJournal;

    let insertAnimalTaxon = function () {
        let sql = "INSERT INTO animaltaxo_t (phylum, class, orderr, family, genus, species,status,journalID) VALUES (?,?,?,?,?,?,?,?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies,status,strJournal], (err, result) => {
            if (err) return next(err);

            res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!", data: result });
        });
    }

    let checkAnimalTaxon = function (cb) {
        let sql = "SELECT genus, species, animaltaxo_t.journalID FROM animaltaxo_t INNER JOIN journal_t ON animaltaxo_t.journalID=journal_t.journalID WHERE species = ? AND genus = ? AND animaltaxo_t.journalID = ?";
        db.get().query(sql, [strSpecies,strGenus,strJournal], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, true);
            }

            else {
                return cb(null, false);
            }
        });
    }

    checkAnimalTaxon((error, result) => {
        if (error) return next(error);

        if (result) {
            insertAnimalTaxon();
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already exists!" });
        }

    });
};

exports.animalTaxonList = (req, res, next) => {

    let sql = "SELECT * FROM animaltaxo_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, details: "", data: result });
    });

}

exports.viewAnimalTaxon = (req,res,next) =>{
    let id = req.params.id;

    let sql = "SELECT * FROM animaltaxo_t INNER JOIN journal_t ON animaltaxo_t.journalID = journal_t.journalID WHERE animalTaxoID = ?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);

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
        
        res.status(200).send({ success: true, details: "", data: dataDisplay });
    });
}

exports.toSelectJournal = (req, res, next) => {
    let sql = "SELECT journalID, code FROM journal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result});
    });
}

exports.addAnimal = (req,res,next) =>{
    
}