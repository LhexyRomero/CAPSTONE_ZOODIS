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
    let state = "notify";
    let category = "Animal Taxonomy";
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;


    let insertAnimalTaxon = function (result) {
        let sql = "INSERT INTO animaltaxo_t (phylum, class, orderr, family, genus, species,status,journalID,dateTime,staffID) VALUES (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)";
        let sql2 = "INSERT INTO notification_t (dateTime, status, staffName, addedData, staffID,category,addedID,state) VALUES (CURRENT_TIMESTAMP,?,?,?,?,?,?,?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies, status, req.session.staffData.journalID, req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql2, [status, name, strGenus + " " + strSpecies,req.session.staffID,category,result.insertId,state], (err2, result2) => {
                if (err2) return next(err2);

                res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!", data: result });
            });

        });
    }

    let checkAnimalTaxon = function (cb) {
        let sql = "SELECT genus, species, animaltaxo_t.journalID FROM animaltaxo_t INNER JOIN journal_t ON animaltaxo_t.journalID=journal_t.journalID WHERE species = ? AND genus = ? AND animaltaxo_t.journalID = ?";
        db.get().query(sql, [strSpecies, strGenus, req.session.staffData.journalID], (err, result) => {
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

    let sql = "SELECT * FROM animaltaxo_t WHERE staffID = ?";
    db.get().query(sql,[req.session.staffID],(err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, details: "", data: result });
    });

}

exports.viewAnimalTaxon = (req, res, next) => {
    let id = req.params.id;

    let sql = "SELECT *,animaltaxo_t.status FROM animaltaxo_t INNER JOIN journal_t ON animaltaxo_t.journalID = journal_t.journalID WHERE animalTaxoID = ?";
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
    let status = 'pending';
    let state = 'notify';
    let category = 'Animal';
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;
    

    let insertAnimal = function (result) {
        let sql = "INSERT INTO animal_t (animalName, animalScientificName, animalTaxoID,image,status,journalID,staffID,dateTime) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql1 = "INSERT INTO notification_t (dateTime,status,staffName,addedData,staffID,category,addedID,state) VALUES (CURRENT_TIMESTAMP,?,?,?,?,?,?,?)";
        db.get().query(sql, [commonName, scientificName, result[0].animalTaxoID, image, status, req.session.staffData.journalID,req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql1,[status,name,scientificName,req.session.staffID,category,result.insertId,state],(err1,result1)=>{
                if (err1) return next(err1); 
                res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });
            });
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

    let sql = "SELECT * FROM animal_t WHERE staffID = ?";
    db.get().query(sql,[req.session.staffID],(err, result) => {
        if (err) return next(err);
        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewAnimal = (req, res, next) => {

    console.log("im here na");
    let id = req.params.id;

    let sql = "SELECT *, animal_t.status FROM animal_t INNER JOIN animaltaxo_t ON animal_t.animalTaxoID = animaltaxo_t.animalTaxoID INNER JOIN journal_t ON journal_t.journalID = animal_t.journalID WHERE animalID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {
            animalName: result[0].animalName,
            animalScientificName: result[0].animalScientificName,
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