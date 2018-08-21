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

exports.bacteriaList = (req,res,next) =>{
    let sql = "SELECT * FROM bacteria_t";

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

exports.viewBacteriaB = (req,res,next) =>{
    let id = req.params.id;

    let sql = "SELECT * FROM bacteria_t INNER JOIN journal_t ON bacteria_t.journalID = journal_t.journalID WHERE bacteriumID = ?";
    db.get().query(sql,[id],(err,result)=>{

        let dataDisplay = {
            bacteriumSpeciesName          : result[0].bacteriumSpeciesName,
            bacteriumGenusName            : result[0].bacteriumGenusName,
            bacteriumScientificName       : result[0].bacteriumScientificName,
            bacteriumTissueSpecifity      : result[0].bacteriumTissueSpecifity,
            bacteriumSampleType           : result[0].bacteriumSampleType,
            bacteriumIsolation            : result[0].bacteriumIsolation,
            bacteriumIdentification       : result[0].bacteriumIdentification,
            status                        : result[0].status,
            title                         : result[0].name
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
    let sql10 = "SELECT animalID, animalScientificName FROM animal_t";
    db.get().query(sql10, (err10, result10) => {
        if (err10) return next(err10);

        res.status(200).send({ success: true, detail: "", data: result10 });
    });
}

exports.toSelectJournalB = (req,res,next) =>{
    let sql = "SELECT journalID, code FROM journal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result});
    });
}

exports.toSelectStaffB = (req,res,next) =>{
    let sql = "SELECT staffID, firstName FROM staff_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result});
    });
}

exports.addBacteria = (req, res, next) => {

    console.log("ADD KA NA");
    let data = req.body;
    let animalID = data.toSelect;
    let strSpeciesName = data.strSpeciesName;
    let strGenusName = data.strGenusName;
    let strScientificName = strGenusName + ' ' + strSpeciesName;
    let strTissueSpecifity = data.strTissueSpecifity;
    let strSampleType = data.strSampleType;
    let strMethodOfIsolation = data.strMethodOfIsolation;
    let strMethodOfIdentification = data.strMethodOfIdentification;
    let journalID = data.selectJournal;

    let checkBacteria = (cb) => {
        console.log("checking function to boi");
        let sql11 = "SELECT * FROM bacteria_t WHERE animalID = ? OR bacteriumScientificName = ?";
        db.get().query(sql11, [animalID, strScientificName], (err11, result11) => {
            if (err11) return cb(err11);

            if (result11.length == 0) {
                return cb(null, true);
            }

            else {
                return cb(null, false);
            }
        });
    }

    let checkSpecies = (cb) => {
        console.log("check Species!");
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
        console.log("Check Genus");
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
        let sql = "INSERT INTO bacteria_t (bacteriumSpeciesName, bacteriumGenusName, bacteriumScientificName,bacteriumTissueSpecifity,bacteriumSampleType,bacteriumIsolation,bacteriumIdentification,animalID,bacteriumTaxoID,journalID) VALUES (?,?,?,?,?,?,?,?,?,?)";
        let dataDisplay = {
            scientificName: strScientificName,
            phylum: result[0].phylum,
            class: result[0].class,
            order: result[0].orderr,
            family: result[0].family,
            genus: result[0].genus,
            species: result[0].species
        }

            db.get().query(sql, [strSpeciesName, strGenusName, strScientificName, strTissueSpecifity, strSampleType, strMethodOfIsolation, strMethodOfIdentification, animalID, result[0].bacteriumTaxoID, journalID], (err, result) => {
                if (err) return next(err);
                res.status(200).send({ success: true, detail: "Successfully Added!" });
            });
    };

    checkBacteria((error, result) => {
        console.log("check niya muna bacteria");
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