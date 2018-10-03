const db = require("../../connection");

exports.addBacteriaTaxon = (req, res, next) => {
    let data = req.body;

    let strPhylum = data.strPhylum;
    let strClass = data.strClass;
    let strOrder = data.strOrder;
    let strFamily = data.strFamily;
    let strGenus = data.strGenus;
    let strSpecies = data.strSpecies;
    let status  = "approved";
    let journal = data.selectJournal;

    let insertBacteriaTaxon = function () {
        let sql = "INSERT INTO bacteriataxo_t (phylum, class, orderr, family, genus, species,status,journalID,staffID,dateTime) VALUES (?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies,status,journal,req.session.staffID], (err, result) => {
            if (err) return next(err);

            res.status(200).send({ success: true, detail: "Successfuly Added!", data: result });
        });
    }

    let checkBacteriaTaxon = function (cb) {
        let sql1 = "SELECT * FROM bacteriataxo_t WHERE species =?";
        db.get().query(sql1, [strSpecies], (err1, result1) => {
            if (err1) return cb(err1);


            if (result1.length == 0) {
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

    let status = "approved";
    let sql2 = "SELECT * FROM bacteriataxo_t WHERE status =?";
    db.get().query(sql2,[status] ,(err2, result2) => {
        if (err2) return next(err2);

        res.status(200).send({ success: true, detail: "", data: result2 });
    });

}

exports.editBacteriaTaxon = (req, res, next) => {

    let id = req.params.id;

    let sql3 = "SELECT * FROM bacteriataxo_t WHERE bacteriumTaxoID = ?";
    db.get().query(sql3, [id], (err3, result3) => {
        if (err3) return next(err3);

        let dataDisplay = {
            id: result3[0].bacteriumTaxoID,
            phylum: result3[0].phylum,
            class: result3[0].class,
            order: result3[0].orderr,
            family: result3[0].family,
            genus: result3[0].genus,
            species: result3[0].species,
        };

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });


}

exports.updateBacteriaTaxon = (req, res, next) => {

    console.log("DITO AKOOOOOOOO");
    let id = req.params.id;
    let data = req.body;

    let strPhylum = data.modalPhylum;
    let strClass = data.modalClass;
    let strOrder = data.modalOrder;
    let strFamily = data.modalFamily;
    let strGenus = data.modalGenus;
    let strSpecies = data.modalSpecies;

    let sql4 = "UPDATE bacteriataxo_t SET phylum = ?, class =?, orderr = ?, family =?,genus=?, species=? WHERE bacteriumTaxoID = ?";
    db.get().query(sql4, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies, id], (err4, result4) => {
        if (err4) return next(err4);

        res.status(200).send({ success: true, detail: "Successfully Updated!" });
    });
}

exports.addToxin = (req, res, next) => {

    let data = req.body;
    let selectBacteria  = data.selectBacteria2;
    let strToxinName = data.strToxinName;
    let strStructureFeature = data.strStructureFeature;
    let strFunction = data.strFunction;
    let status = "approved";

    let checkToxin = function (cb) {
        let sql5 = "SELECT * FROM toxin_t WHERE name =?"; //undecided
        db.get().query(sql5, [strToxinName], (err5, result5) => {
            if (err5) return cb(err5);

            if (result5.length == 0) {
                return cb(null, true);
            }

            else {
                return cb(null, false);
            }
        });
    }

    let insertToxin = function () {
        let sql6 = "INSERT INTO toxin_t (name,structureFeature,function,status,staffID,dateTime) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql7 = "INSERT INTO bacteriatoxin_t (bacteriumID,toxinID) VALUES (?,?)";
        db.get().query(sql6, [strToxinName, strStructureFeature, strFunction,status,req.session.staffID], (err6, result6) => {
            if (err6) return next(err6);
            db.get().query(sql7,[selectBacteria,result6.insertId],(err,result)=>{

                res.status(200).send({ success: true, detail: ""});
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

exports.toxinList = (req, res, next) => {
    let status = "approved";
    let sql7 = "SELECT * FROM toxin_t WHERE status =?";
    db.get().query(sql7,[status],(err7, result7) => {
        if (err7) return next(err7);

        res.status(200).send({ success: true, detail: "", data: result7 });
    });
}

exports.editToxin = (req, res, next) => {
    id = req.params.id;

    let sql8 = "SELECT * FROM toxin_t INNER JOIN bacteriatoxin_t ON toxin_t.toxinID = bacteriatoxin_t.toxinID INNER JOIN bacteria_t ON bacteria_t.bacteriumID = bacteriatoxin_t.bacteriumID WHERE toxin_t.toxinID = ?";
    db.get().query(sql8, [id], (err8, result8) => {
        if (err8) return next(err8);

        console.log(result8);
        let dataDisplay = {

            bacteriumID : result8[0].bacteriumID,
            name: result8[0].name,
            structureFeature: result8[0].structureFeature,
            toxinFunction: result8[0].function
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });

}

exports.updateToxin = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;

    let bacteriumID = data.modalSelect;
    let strToxinName = data.modalToxinName;
    let strStructureFeature = data.modalStructureFeature;
    let strFunction = data.modalFunction;

    let sql9 = "UPDATE toxin_t SET name = ?, structureFeature = ?, function = ?  WHERE toxinID = ?";
    let sql10 = "UPDATE bacteriatoxin_t SET bacteriumID = ? , toxinID = ? WHERE toxinID = ?";
    db.get().query(sql9, [strToxinName, strStructureFeature, strFunction, id], (err9, result9) => {
        if (err9) return next(err9);
        db.get().query(sql10,[bacteriumID,id,id],(err,result)=>{
            if(err) return next(err);

            res.status(200).send({ success: true, detail: "Successfully Updated!" });
        });
    });
}

exports.toSelectBacteria = (req, res, next) => {
    let sql10 = "SELECT animalID, animalName FROM animal_t";
    db.get().query(sql10, (err10, result10) => {
        if (err10) return next(err10);

        res.status(200).send({ success: true, detail: "", data: result10 });
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
    let journal = data.selectJournal;
    let status = "approved";
    let isInserting = data.isInserting;


    let checkBacteria = (cb) => {
        console.log("checking function to boi");
        let sql11 = "SELECT * FROM bacteria_t WHERE animalID = ? AND bacteriumScientificName = ?";
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
        let sql = "INSERT INTO bacteria_t (bacteriumSpeciesName, bacteriumGenusName, bacteriumScientificName,bacteriumTissueSpecifity,bacteriumSampleType,bacteriumIsolation,bacteriumIdentification,animalID,bacteriumTaxoID,journalID,status,staffID,dateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        let dataDisplay = {
            scientificName: strScientificName,
            phylum: result[0].phylum,
            class: result[0].class,
            order: result[0].orderr,
            family: result[0].family,
            genus: result[0].genus,
            species: result[0].species
        }

        if (isInserting) {
            db.get().query(sql, [strSpeciesName, strGenusName, strScientificName, strTissueSpecifity, strSampleType, strMethodOfIsolation, strMethodOfIdentification,animalID, result[0].bacteriumTaxoID,journal,status,req.session.staffID], (err, result) => {
                if (err) return next(err);
                res.status(200).send({ success: true, detail: "Successfully Added!" });
            });

        }

        else {
            res.status(200).send({ success: true, detail: "", data: dataDisplay });
        }
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
                        //inser
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

    let status = "approved";
    let sql = "SELECT * FROM bacteria_t INNER JOIN animal_t ON bacteria_t.animalID = animal_t.animalID WHERE bacteria_t.status = ?;";
    db.get().query(sql,[status] ,(err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });

    });

}

exports.viewBacteria = (req,res,next) =>{
    let id = req.params.id;

    let sql = "SELECT * FROM bacteria_t INNER JOIN animal_t ON bacteria_t.animalID = animal_t.animalID INNER JOIN bacteriataxo_t ON bacteria_t.bacteriumTaxoID = bacteriataxo_t.bacteriumTaxoID WHERE bacteriumID = ?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);

        let dataDisplay = {
            animalID                : result[0].animalID,
            animalName              : result[0].animalName,
            genusName               : result[0].bacteriumGenusName,
            speciesName             : result[0].bacteriumSpeciesName,
            scientificName          : result[0].bacteriumScientificName,
            tissueSpecifity         : result[0].bacteriumTissueSpecifity,
            sampleType              : result[0].bacteriumSampleType,
            isolation               : result[0].bacteriumIsolation,
            identification          : result[0].bacteriumIdentification,
            gramStain               : result[0].bacteriumGramStain,
            length                  : result[0].bacteriumCellLength,
            width                   : result[0].bacteriumCellWidth,
            shape                   : result[0].bacteriumCellShape,
            motility                : result[0].bacteriumMotility,
            phylum                  : result[0].phylum,
            class                   : result[0].class,
            order                   : result[0].orderr,
            family                  : result[0].family,
            genus                   : result[0].genus,
            species                 : result[0].species
        }

        res.status(200).send({success: true, detail:"", data:dataDisplay});
    });
}

exports.updateBacteria = (req,res,next) => {

    let id = req.params.id;
    let data = req.body;

    let animalID = data.toSelect;
    let speciesName = data.modalSpeciesName;
    let genusName = data.modalGenusName;
    let scientificName = genusName+" "+speciesName;
    let tissue = data.modalTissue;
    let sample = data.modalSample;
    let isolation = data.modalIsolation;
    let identification = data.modalIdentification;

    let checkBacteria = (cb) => {
        console.log("checking function to boi");
        let sql11 = "SELECT * FROM bacteria_t WHERE bacteriumScientificName = ?";
        db.get().query(sql11, [animalID, scientificName], (err11, result11) => {
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
        db.get().query(sql, [speciesName], (err, result) => {
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
        db.get().query(sql, [genusName], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, undefined);
            }
            else {
                return cb(null, result);
            }
        });
    }

    let updateBacteria = (result) => {
        let sql = "UPDATE bacteria_t SET bacteriumSpeciesName = ?, bacteriumGenusName = ?, bacteriumScientificName =?, bacteriumTissueSpecifity =?, bacteriumSampleType =?, bacteriumIsolation =?, bacteriumIdentification =?, animalID = ?,bacteriumTaxoID =? WHERE bacteriumID = ?";
        db.get().query(sql,[speciesName,genusName,scientificName,tissue,sample,isolation,identification,animalID,result[0].bacteriumTaxoID,id],(err,result) =>{
            if(err) return next(err);

            res.status(200).send({success: true, detail:"Successfully Updated!",});

        });
    }


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
                        updateBacteria(species);
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

exports.toSelectBacteria2 = (req,res,next) =>{
    
    let sql = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"", data:result});
    });
}


exports.toSelectJournalBacteria = (req, res, next) => {
    let sql = "SELECT journalID, code FROM journal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

