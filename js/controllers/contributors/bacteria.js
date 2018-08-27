const db = require("../../connection");

exports.addBacteriaTaxon = (req, res, next) => {
    let data = req.body;

    let strPhylum = data.strPhylum;
    let strClass = data.strClass;
    let strOrder = data.strOrder;
    let strFamily = data.strFamily;
    let strGenus = data.strGenus;
    let strSpecies = data.strSpecies;
    let status = 'pending';
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;
    let category = 'Bacteria Taxonomy';
    let state = 'notify';

    let insertBacteriaTaxon = function () {
        let sql = "INSERT INTO bacteriataxo_t (phylum, class, orderr, family, genus, species,status,journalID,staffID,date) VALUES (?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
        let sql2 = "INSERT INTO notification_t (dateTime, status, staffName, addedData, staffID, category,addedID,state) VALUES (CURRENT_DATE, ?, ?, ?, ?, ?,?,?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies, status, req.session.staffData.journalID, req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql2, [status, name, strGenus + " " + strSpecies, req.session.staffID, category, result.insertId, state], (err2, result2) => {
                if (err2) return next(err2);

                res.status(200).send({ success: true, detail: "Successfuly Submitted to Admin!", data: result });
            });

        });
    }

    let checkBacteriaTaxon = function (cb) {
        let sql = "SELECT genus, species, bacteriataxo_t.journalID FROM bacteriataxo_t INNER JOIN journal_t ON bacteriataxo_t.journalID=journal_t.journalID WHERE species = ? AND genus = ? AND bacteriataxo_t.journalID = ?";
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

exports.bacteriaTaxonList = (req, res, next) => {
    let sql = "SELECT * FROM bacteriataxo_t WHERE staffID =?";

    db.get().query(sql,[req.session.staffID], (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewBacteriaTaxon = (req, res, next) => {
    let id = req.params.id;

    let sql = "SELECT * , bacteriataxo_t.status FROM bacteriataxo_t INNER JOIN journal_t ON bacteriataxo_t.journalID = journal_t.journalID WHERE bacteriumTaxoID = ?";
    db.get().query(sql, [id], (err, result) => {

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

        console.log(dataDisplay);
        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.addToxin = (req, res, next) => {

    let data = req.body;
    let selectBacteria = data.selectBacteria;
    let strToxinName = data.strToxinName;
    let strStructureFeature = data.strStructureFeature;
    let strFunction = data.strFunction;
    let status = "pending";
    let state = "notify";
    let category = "Toxin";
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;
    console.log(name);

    let checkToxin = function (cb) {
        let sql = "SELECT * FROM toxin_t INNER JOIN bacteriatoxin_t ON toxin_t.toxinID = bacteriatoxin_t.toxinID WHERE toxin_t.toxinID = ? AND name = ?";
        db.get().query(sql, [selectBacteria, strToxinName], (err, result) => {
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
        let sql = "INSERT INTO toxin_t (name,structureFeature,function,status,staffID,date) VALUES (?,?,?,?,?,CURRENT_DATE)";
        let sql1 = "INSERT INTO bacteriatoxin_t (bacteriumID,toxinID) VALUES (?,?)";
        let sql2 = "INSERT INTO notification_t (dateTime, status,staffName, addedData, staffID, category,addedID,state) VALUES (CURRENT_DATE,?,?,?,?,?,?,?)";
        db.get().query(sql, [strToxinName, strStructureFeature, strFunction, status, req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql1, [selectBacteria, result.insertId], (err1, result1) => {
                if (err1) return next(result1);
                db.get().query(sql2, [status, name, strToxinName, req.session.staffID, category, result.insertId, state], (err2, result2) => {
                    if (err2) return next(err2);
                    res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });
                });
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
    let sql10 = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
    db.get().query(sql10, (err10, result10) => {
        if (err10) return next(err10);

        res.status(200).send({ success: true, detail: "", data: result10 });
    });
}

exports.toSelectJournal = (req, res, next) => {
    let sql = "SELECT journalID, code FROM journal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}


exports.toxinList = (req, res, next) => {
    let sql = "SELECT * FROM toxin_t";
    db.get().query(sql,(err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewToxin = (req, res, next) => {
    let id = req.params.id;

    let sql = "SELECT * FROM toxin_t WHERE toxinID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {
            name: result[0].name,
            feature: result[0].structureFeature,
            func: result[0].function,
            status: result[0].status
        }
        res.status(200).send({ success: true, detail: "", data: dataDisplay });

    });
}

exports.toSelectAnimal = (req, res, next) => {

    let sql = "SELECT animalID, animalName FROM animal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.addBacteria = (req, res, next) => {

    let data = req.body;
    let animalID = data.toAnimal;
    let strSpeciesName = data.strSpeciesName;
    let strGenusName = data.strGenusName;
    let strScientificName = strGenusName + ' ' + strSpeciesName;
    let strTissueSpecifity = data.strTissueSpecifity;
    let strSampleType = data.strSampleType;
    let strMethodOfIsolation = data.strMethodOfIsolation;
    let strMethodOfIdentification = data.strMethodOfIdentification;
    let journal = data.selectJournal;
    let status = 'pending';
    let state = 'notify';
    let category = 'Bacteria';
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;

    let checkBacteria = (cb) => {
        let sql11 = "SELECT * FROM bacteria_t WHERE animalID = ? AND bacteriumScientificName = ?";
        db.get().query(sql11, [animalID, strScientificName], (err11, result11) => {
            if (err11) return cb(err11);

            console.log(result11);
            if (result11.length == 0) {
                return cb(null, true);
            }

            else {
                return cb(null, false);
            }
        });
    }

    let checkSpecies = (cb) => {
        let sql = "SELECT * FROM bacteriataxo_t WHERE species = ?";
        db.get().query(sql, [strSpeciesName], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, undefined);
            }
            else {
                return cb(null, result);
            }
        });
    }

    let checkGenus = (cb) => {
        let sql = "SELECT * FROM bacteriataxo_t WHERE genus =?";
        db.get().query(sql, [strGenusName], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, undefined);
            }
            else {
                return cb(null, result);
            }
        });
    }

    let insertBacteria = (result) => {
        let sql = "INSERT INTO bacteria_t (bacteriumSpeciesName, bacteriumGenusName, bacteriumScientificName,bacteriumTissueSpecifity,bacteriumSampleType,bacteriumIsolation,bacteriumIdentification,animalID,bacteriumTaxoID,journalID,status,staffID,date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_DATE)";
        let sql1 = "INSERT INTO notification_t (dateTime,status,staffName, addedData, staffID,category,addedID,state) VALUES (CURRENT_DATE,?,?,?,?,?,?,?)";
        db.get().query(sql, [strSpeciesName, strGenusName, strScientificName, strTissueSpecifity, strSampleType, strMethodOfIsolation, strMethodOfIdentification, animalID, result[0].bacteriumTaxoID, req.session.staffData.journalID, status, req.session.staffID], (err, resulta) => {
            if (err) return next(err);
            console.log("1st queyr");
            db.get().query(sql1, [status, name, strScientificName, req.session.staffID,category,resulta.insertId,state], (err1, result1) => {
                if (err1) return next(err1);
                console.log("2nd query");
                res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });
            });
        });
    };

    checkBacteria((error, result) => {
        if (error) return next(error);

        if (result) {
            checkGenus((error1, genus) => {
                if (error1) return next(error1);

                checkSpecies((error2, species) => {
                    if (error2) return next(error2);

                    if (!genus && !species) {
                        res.status(200).send({ success: false, detail: "Genus and Species not found!", error: 1 });
                    }

                    else if (!genus && species) {
                        console.log("genus error!");
                        res.status(200).send({ success: false, detail: "Genus not found!", error: 2 });
                    }

                    else if (!species && genus) {
                        console.log("species error!");
                        res.status(200).send({ success: false, detail: "Species not found!", error: 3 });
                    }

                    else {
                        insertBacteria(species);
                    }
                });
            });
            return;
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already Exists!", error: 4 });
        }
    });
}

exports.bacteriaList = (req, res, next) => {
    let sql = "SELECT * FROM bacteria_t WHERE staffID =?";
    db.get().query(sql,[req.session.staffID], (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewBacteria = (req, res, next) => {
    let id = req.params.id;

    let sql = "SELECT * , bacteria_t.status FROM bacteria_t INNER JOIN animal_t ON bacteria_t.animalID = animal_t.animalID INNER JOIN bacteriataxo_t ON bacteria_t.bacteriumTaxoID = bacteriataxo_t.bacteriumTaxoID WHERE bacteriumID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {

            status: result[0].status,
            animalID: result[0].animalID,
            animalName: result[0].animalName,
            genusName: result[0].bacteriumGenusName,
            speciesName: result[0].bacteriumSpeciesName,
            scientificName: result[0].bacteriumScientificName,
            tissueSpecifity: result[0].bacteriumTissueSpecifity,
            sampleType: result[0].bacteriumSampleType,
            isolation: result[0].bacteriumIsolation,
            identification: result[0].bacteriumIdentification,
            gramStain: result[0].bacteriumGramStain,
            length: result[0].bacteriumCellLength,
            width: result[0].bacteriumCellWidth,
            shape: result[0].bacteriumCellShape,
            motility: result[0].bacteriumMotility,
            phylum: result[0].phylum,
            class: result[0].class,
            order: result[0].orderr,
            family: result[0].family,
            genus: result[0].genus,
            species: result[0].species
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}