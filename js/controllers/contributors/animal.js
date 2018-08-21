const db = require("../../connection");

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
    


    let insertAnimalTaxon = function (result) {
        let sql = "INSERT INTO animaltaxo_t (phylum, class, orderr, family, genus, species,status,journalID,date,staffID) VALUES (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies, status, strJournal,req.session.staffID], (err, result) => {
            if (err) return next(err);

            res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!", data: result });
        });
    }

    let checkAnimalTaxon = function (cb) {
        let sql = "SELECT genus, species, animaltaxo_t.journalID FROM animaltaxo_t INNER JOIN journal_t ON animaltaxo_t.journalID=journal_t.journalID WHERE species = ? AND genus = ? AND animaltaxo_t.journalID = ?";
        db.get().query(sql, [strSpecies, strGenus, strJournal], (err, result) => {
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

exports.viewAnimalTaxon = (req, res, next) => {
    let id = req.params.id;

    let sql = "SELECT * FROM animaltaxo_t INNER JOIN journal_t ON animaltaxo_t.journalID = journal_t.journalID WHERE animalTaxoID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {
            phylum: result[0].phylum,
            classs: result[0].class,
            order: result[0].orderr,
            family: result[0].family,
            genus: result[0].genus,
            species: result[0].species,
            status: result[0].status,
            title: result[0].name
        }

        res.status(200).send({ success: true, details: "", data: dataDisplay });
    });
}

exports.toSelectJournal = (req, res, next) => {
    let sql = "SELECT journalID, code FROM journal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.addAnimal = (req, res, next) => {

    if (!req.file) {
        res.status(200).send({ success: false, error: 1, detail: "No Image Provided" });
        return;
    }

    let data = req.body;
    let image = req.file.path;
    let commonName = data.strCommonName;
    let scientificName = data.strScientificName + "";
    let finalScienctific = scientificName.split(' ');
    let genusName = finalScienctific[0];
    let scienceName = data.strScientificName + "";
    let speciesName = finalScienctific[1];
    let bodySite = data.strBodySite;
    let animalTaxoID = 0;
    let status = 'pending';
    let journal = data.selectJournal;

    let insertAnimal = function (result) {
        let sql = "INSERT INTO animal_t (animalName, animalScientificName, animalBodySite, animalTaxoID,image,status,journalID) VALUES (?,?,?,?,?,?,?)";
        db.get().query(sql, [commonName, scientificName, bodySite, result[0].animalTaxoID, image, status, journal], (err, result) => {
            if (err) return next(err);

            res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });

        });
    }

    let checkAnimal = function (cb) {
        let sql = "SELECT * FROM animal_t WHERE animalName =?";
        db.get().query(sql, [commonName], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, true);
            }

            else {
                return cb(null, false);
            }
        });
    }

    checkAnimal((error, result) => {
        if (error) return next(error);
        if (result) {
            if (scientificName.length > 1) {
                let sql = "SELECT * FROM animaltaxo_t WHERE species = ?";
                db.get().query(sql, [speciesName], (err, result) => {
                    if (err) return next(err);

                    if (result.length == 0) {
                        res.status(200).send({ success: false, detail: "Species not found", error: 2 });
                    }
                    else {
                        insertAnimal(result);
                    }
                })
            }
        }
        else {
            res.status(200).send({ success: false, error: 3, detail: "Data Already Exists" });
        }
    });

}

exports.animalList = (req, res, next) => {

    let sql = "SELECT * FROM animal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);
        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewAnimal = (req, res, next) => {

    console.log("im here na");
    let id = req.params.id;

    let sql = "SELECT * FROM animal_t INNER JOIN animaltaxo_t ON animal_t.animalTaxoID = animaltaxo_t.animalTaxoID INNER JOIN journal_t ON journal_t.journalID = animal_t.journalID WHERE animalID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {
            animalName: result[0].animalName,
            animalScientificName: result[0].animalScientificName,
            bodySite: result[0].animalBodySite,
            phylum: result[0].phylum,
            classs: result[0].class,
            order: result[0].orderr,
            family: result[0].family,
            genus: result[0].genus,
            species: result[0].species,
            image: result[0].image,
            title: result[0].name,
            status: result[0].status
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });

}