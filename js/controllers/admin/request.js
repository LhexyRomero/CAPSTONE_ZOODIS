const db = require('../../connection');

exports.notiCard = (req,res,next) =>{

    let state = "noticed";
    let sql = "SELECT * FROM request_t WHERE state = ? AND staffID =?";
    db.get().query(sql,[state,req.session.staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.requestList = (req, res, next) => {
    let status = "pending";

    let sql = "SELECT * FROM request_t WHERE status = ?";
    db.get().query(sql, [status], (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewAnimalTaxo = (req, res, next) => {
    let id = req.params.id;
    let sql = "SELECT * FROM animaltaxo_t WHERE animalTaxoID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {
            phylum: result[0].phylum,
            classs: result[0].class,
            order: result[0].orderr,
            family: result[0].family,
            genus: result[0].genus,
            species: result[0].species,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.approvedAnimalTaxo = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let phylum = data.matPhylum;
    let classs = data.matClass;
    let order = data.matOrder;
    let family = data.matFamily;
    let genus = data.matGenus;
    let species = data.matSpecies;
    let state = "noticed";
    let status = "approved";
    let category = "Animal Taxonomy"

    let sql = "UPDATE request_t SET state=?, status=? , dateTime = CURRENT_TIMESTAMP WHERE category =? AND addedID =?";
    let sql1 = "UPDATE animaltaxo_t SET phylum=?, class=?, orderr=?, family=?, dateTime = CURRENT_TIMESTAMP,genus=?, species=?, status=? WHERE animalTaxoID = ?";
    db.get().query(sql, [state, status, category, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [phylum, classs, order, family, genus, species, status, id], (err1, result1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Successfully Approved!" });
        });
    });
}

exports.rejectAnimalTaxo = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let status = "rejected";
    let state = "noticed";
    let category = "Animal Taxonomy";
    let reasons = data.reasons;

    let sql = "UPDATE request_t SET state=?, status=? ,message =? WHERE addedID =? AND category =?";
    let sql1 = "UPDATE animaltaxo_t SET status = ? WHERE animalTaxoID = ?";
    db.get().query(sql, [state, status, reasons, id, category], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [status, id], (err1, result1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Data Rejected!" });
        });
    });
}

exports.viewBacteriaTaxo = (req, res, next) => {
    let id = req.params.id;
    let sql = "SELECT * FROM bacteriataxo_t WHERE bacteriumTaxoID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        let dataDisplay = {
            phylum: result[0].phylum,
            classs: result[0].class,
            order: result[0].orderr,
            family: result[0].family,
            genus: result[0].genus,
            species: result[0].species,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.approvedBacteriaTaxo = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let phylum = data.mbtPhylum;
    let classs = data.mbtClass;
    let order = data.mbtOrder;
    let family = data.mbtFamily;
    let genus = data.mbtGenus;
    let species = data.mbtSpecies;
    let state = "noticed";
    let status = "approved";
    let category = "Bacteria Taxonomy"

    let sql = "UPDATE request_t SET dateTime = CURRENT_TIMESTAMP, state=?, status=? WHERE category =? AND addedID =?";
    let sql1 = "UPDATE bacteriataxo_t SET dateTime = CURRENT_TIMESTAMP, phylum=?, class=?, orderr=?, family=?, genus=?, species=?, status=? WHERE bacteriumTaxoID = ?";
    db.get().query(sql, [state, status, category, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [phylum, classs, order, family, genus, species, status, id], (err1, result1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Successfully Approved!" });
        });
    });
}

exports.rejectBacteriaTaxo = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let status = "rejected";
    let state = "noticed";
    let category = "Bacteria Taxonomy";
    let reasons = data.reasons;

    let sql = "UPDATE request_t SET state=?, status=? ,message =? WHERE addedID =? AND category =?";
    let sql1 = "UPDATE bacteriataxo_t SET status = ? WHERE bacteriumTaxoID = ?";
    db.get().query(sql, [state, status, reasons, id, category], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [status, id], (err1, result1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Data Rejected!" });
        });
    });
}

exports.selectBacteria = (req, res, next) => {

    let sql = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewToxin = (req, res, next) => {
    let id = req.params.id;
    let sql = "SELECT * FROM `bacteriatoxin_t` LEFT JOIN toxin_t ON bacteriatoxin_t.toxinID = toxin_t.toxinID LEFT JOIN bacteria_t ON bacteriatoxin_t.bacteriumID = bacteria_t.bacteriumID WHERE toxin_t.toxinID = ?";
    db.get().query(sql, [id], (err, result) => {
        if (err) return next(err);

        dataDisplay = {
            bacteriumID: result[0].bacteriumID,
            name: result[0].name,
            feature: result[0].structureFeature,
            functionn: result[0].function,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.approvedToxin = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let bacteriumID = data.selectBToxin;
    let toxin = data.toxin;
    let sctructureFeature = data.sctructureFeature;
    let functionn = data.functionn;
    let status = "approved";
    let state = "noticed";
    let category = "Toxin";

    let sql = "UPDATE request_t SET state=?, status=? WHERE category =? AND addedID =?";
    let sql1 = "UPDATE toxin_t SET name = ?, structureFeature = ?, function = ?, status =?  WHERE toxinID = ?";
    let sql2 = "UPDATE bacteriatoxin_t SET bacteriumID = ? , toxinID = ? WHERE toxinID = ?";
    db.get().query(sql, [state, status, category, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [toxin, sctructureFeature, functionn, status, id], (err1, return1) => {
            if (err1) return next(err1);
            db.get().query(sql2, [bacteriumID, id, id], (err2, result2) => {
                if (err2) return next(err2);

                res.status(200).send({ success: true, detail: "Successfully Approved!" });

            });
        });

    });
}

exports.rejectToxin = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    let reasons = data.reasons;
    let category = "Toxin";
    let status = "rejected";
    let state = "noticed";

    let sql = "UPDATE request_t SET state=?, status=?, message=? WHERE category =? AND addedID =?";
    let sql1 = "UPDATE toxin_t SET status =?  WHERE toxinID = ?";
    db.get().query(sql, [state, status, reasons, category, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [status, id], (err1, return1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Data Rejected!" });

        });
    });
}

exports.viewDisease = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;

    let sql3 = "SELECT * FROM disease_t WHERE diseaseID = ?";
    db.get().query(sql3, [id], (err3, result3) => {
        if (err3) return next(err3);

        let splittedSymptoms = result3[0].symptoms.split(":");
        console.log(splittedSymptoms);
        let dataDisplay = {

            diseaseName: result3[0].diseaseName,
            diseaseDesc: result3[0].diseaseDesc,
            symptoms: splittedSymptoms,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.approvedDisease = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let bacteriumID = data.selectBacteria1;
    let status = "approved";
    let state = "noticed";
    let category = "Disease";
    let sql = "UPDATE disease_t SET diseaseName = ?, diseaseDesc = ?, symptoms = ?,status=? WHERE diseaseID = ?";
    let sql1 = "UPDATE bacteriadisease_t SET bacteriumID =? , diseaseID =? WHERE diseaseID = ?";
    let sql2 = "UPDATE request_t SET state =?,status =? WHERE category =? AND addedID =? ";
    let error = 0;

    //Some validations here... 
    let queryData = [];
    queryData.push(data.modalName);
    queryData.push(data.modalDesc);
    queryData.push(data.symptoms);
    queryData.push("approved");
    queryData.push(id);

    queryData.forEach((e) => {
        if (e == undefined || e == null) {
            error++;
        }
    });

    if (error == 0) {
        db.get().query(sql, queryData, function (err, result) {
            if (err) return next(err);
            db.get().query(sql1, [bacteriumID, id, id], (err1, result1) => {
                if (err1) return next(err1);
                db.get().query(sql2, [state, status, category, id], (err2, result2) => {
                    if (err2) return next(err2);
                    res.status(200).send({ success: true, detail: "Successfully Approved" });
                });
            });
        });
    } else {
        res.status(200).send({ success: false, detail: "Invalid Data" });
    }
}

exports.rejectDisease = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    let reasons = data.reasons;
    let category = "Disease";
    let status = "rejected";
    let state = "noticed";

    let sql = "UPDATE request_t SET state=?, status=?, message=? WHERE category =? AND addedID =?";
    let sql1 = "UPDATE disease_t SET status =?  WHERE diseaseID = ?";
    db.get().query(sql, [state, status, reasons, category, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [status, id], (err1, return1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Data Rejected!" });

        });
    });
}

exports.selectDisease = (req, res, next) => {

    let sql = "SELECT diseaseID, diseaseName FROM disease_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewPrevention = (req, res, next) => {
    let id = req.params.id;

    let sql3 = "SELECT * FROM prevention_t INNER JOIN disease_t ON prevention_t.diseaseID = disease_t.diseaseID WHERE preventionID = ?";
    db.get().query(sql3, [id], (err3, result3) => {
        if (err3) return next(err3);

        let splittedPreventions = result3[0].preventions.split(":");
        let dataDisplay = {

            diseaseID: result3[0].diseaseID,
            diseaseName: result3[0].diseaseName,
            preventions: splittedPreventions,
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
}

exports.approvedPrevention = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    let status = "approved";
    let state = "noticed";
    let category = "Prevention";
    let sql = "UPDATE prevention_t SET diseaseID = ?,  preventions = ?, status = ? WHERE preventionID = ?";
    let sql1 = "UPDATE request_t SET state =?,status =? WHERE category =? AND addedID =? ";
    let error = 0;

    //Some validations here... 
    let queryData = [];
    queryData.push(data.selectDisease);
    queryData.push(data.preventions);
    queryData.push("approved");
    queryData.push(id);

    queryData.forEach((e) => {
        if (e == undefined || e == null) {
            error++;
        }
    });

    if (error == 0) {
        db.get().query(sql, queryData, function (err, result) {
            if (err) return next(err);
            db.get().query(sql1, [state, status, category, id], (err1, result1) => {
                if (err1) return next(err1);

                res.status(200).send({ success: true, detail: "Successfully Approved!" });
            });
        });
    } else {
        res.status(200).send({ success: false, detail: "Invalid Data" });
    }
}

exports.rejectPrevention = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    let reasons = data.reasons;
    let category = "Prevention";
    let status = "rejected";
    let state = "noticed";

    let sql = "UPDATE request_t SET state=?, status=?, message=? WHERE category =? AND addedID =?";
    let sql1 = "UPDATE prevention_t SET status =?  WHERE preventionID = ?";
    db.get().query(sql, [state, status, reasons, category, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [status, id], (err1, return1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Data Rejected!" });

        });
    });
}

exports.viewAnimal = (req, res, next) => {

    console.log("im here na");
    let id = req.params.id;

    let sql = "SELECT * FROM animal_t INNER JOIN animaltaxo_t ON animal_t.animalTaxoID = animaltaxo_t.animalTaxoID WHERE animalID = ?";
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
            image: result[0].image
        }

        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });


}

exports.selectAnimal = (req, res, next) => {
    let sql = "SELECT * FROM animal_t";
    db.get().query(sql, (err, result) => {
        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewBacteria = (req, res, next) => {

    let id = req.params.id;
    let status = 1;

    let sql = "SELECT * FROM bacteria_t INNER JOIN bacteriataxo_t ON bacteria_t.bacteriumTaxoID = bacteriataxo_t.bacteriumTaxoID WHERE bacteriumID = ?";
    let sql1 = "SELECT animalbacteria_t.bacteriumID, animalbacteria_t.animalID, animalName FROM animal_t INNER JOIN animalbacteria_t ON animal_t.animalID = animalbacteria_t.animalID WHERE bacteriumID = ? AND animalbacteria_t.status =?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[id,status],(err1,result1)=>{
            if(err1) return next(err1);
                console.log(result1);
            let dataDisplay = {
                animal                  : result1,
                bacteriumID             : result[0].bacteriumID,
                genusName               : result[0].bacteriumGenusName,
                speciesName             : result[0].bacteriumSpeciesName,
                scientificName          : result[0].bacteriumScientificName,
                tissueSpecifity         : result[0].bacteriumTissueSpecifity,
                sampleType              : result[0].bacteriumSampleType,
                isolation               : result[0].bacteriumIsolation,
                identification          : result[0].bacteriumIdentification,
                phylum                  : result[0].phylum,
                class                   : result[0].class,
                order                   : result[0].orderr,
                family                  : result[0].family,
                genus                   : result[0].genus,
                species                 : result[0].species
            }
    
            res.status(200).send({success: true, detail:"", data:dataDisplay});
        });

    });
}

exports.approvedAnimal = function (req, res, next) {

    let id = req.params.id;
    let data = req.body;
    let scientificName = data.modalScientificName + "";
    let finalScienctific = scientificName.split(' ');
    let genusName = finalScienctific[0];
    let scienceName = data.strScientificName + "";
    let speciesName = finalScienctific[finalScienctific.length - 1];
    let status = "approved";
    let state = "noticed";
    let category = "Animal";

    let sql3 = "UPDATE animal_t SET dateTime=CURRENT_TIMESTAMP,status=? WHERE animalID = ?";
    let sql1 = "UPDATE request_t SET dateTime = CURRENT_TIMESTAMP, state =?,status =? WHERE category =? AND addedID =? ";
    db.get().query(sql3, [status, req.params.id], (error, result3) => {
        if (error) return next(error);
        db.get().query(sql1, [state, status, category, id], (err1, result1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Successfully Approved!", });
        });
    });
}

exports.rejectAnimal = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    let reasons = data.reasons;
    let category = "Animal";
    let status = "rejected";
    let state = "noticed";

    let sql = "UPDATE animal_t SET status = ?, dateTime = CURRENT_TIMESTAMP WHERE animalID = ?";
    let sql1 = "UPDATE request_t SET state=?, status=?, message=? WHERE category =? AND addedID =?";
    db.get().query(sql, [status, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [state, status, reasons, category, id], (err1, result1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Data Rejected!" });
        });
    });
}

exports.approvedBacteria = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;

    let speciesName = data.speciesName;
    let genusName = data.genusName;
    let scientificName = genusName + " " + speciesName;
    let tissue = data.tissueSpecifity;
    let sample = data.sampleType;
    let isolation = data.isolation;
    let identification = data.identification;
    let status = "approved";
    let state = "noticed";

    let checkBacteria = (cb) => {
        let sql11 = "SELECT * FROM bacteria_t WHERE bacteriumScientificName = ?";
        db.get().query(sql11, [scientificName], (err11, result11) => {
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
        let sql = "UPDATE bacteria_t SET bacteriumSpeciesName = ?, bacteriumGenusName = ?, bacteriumScientificName =?, bacteriumTissueSpecifity =?, bacteriumSampleType =?, bacteriumIsolation =?, bacteriumIdentification =?,bacteriumTaxoID =?,staffID = ?,dateTime=CURRENT_TIMESTAMP,status=? WHERE bacteriumID = ?";
        let sql1 = "UPDATE request_t SET dateTime = CURRENT_TIMESTAMP, status = ?,state = ? WHERE addedID = ?";
        db.get().query(sql, [speciesName, genusName, scientificName, tissue, sample, isolation, identification,result[0].bacteriumTaxoID,  req.session.staffID, status,id], (err, result) => {
            if (err) return next(err);
            db.get().query(sql1, [status, state, id], (err1, result1) => {
                if (err1) return next(err1);
                console.log(result1);

                res.status(200).send({success: true, detail: "Successfully Approved"});
            });
        });
    }

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

exports.rejectBacteria = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    let reasons = data.reasons;
    let category = "Bacteria";
    let status = "rejected";
    let state = "noticed";

    let sql = "UPDATE bacteria_t SET status = ?, dateTime = CURRENT_TIMESTAMP WHERE bacteriumID = ?";
    let sql1 = "UPDATE request_t SET state=?, status=?, message=? WHERE category =? AND addedID =?";
    db.get().query(sql, [status, id], (err, result) => {
        if (err) return next(err);
        db.get().query(sql1, [state, status, reasons, category, id], (err1, result1) => {
            if (err1) return next(err1);

            res.status(200).send({ success: true, detail: "Data Rejected!" });
        });
    });
}
