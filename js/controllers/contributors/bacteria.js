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
        let sql = "INSERT INTO bacteriataxo_t (phylum, class, orderr, family, genus, species,status,journalID,staffID,dateTime) VALUES (?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql2 = "INSERT INTO request_t (dateTime, status, staffName, addedData, staffID, category,addedID,state,assignID) VALUES (CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?,?,?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies, status, req.session.staffData.journalID, req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql2, [status, name, strGenus + " " + strSpecies, req.session.staffID, category, result.insertId, state, req.session.staffData.journalID], (err2, result2) => {
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
            res.status(200).send({ success: false, detail: "Data Already Exists!" })
        }
    });


}

exports.bacteriaTaxonList = (req, res, next) => {
    let sql = "SELECT * FROM bacteriataxo_t WHERE staffID =?";

    db.get().query(sql, [req.session.staffID], (err, result) => {
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

    let checkToxin = function (cb) {
        let sql = "SELECT toxinID, name FROM toxin_t WHERE name = ?";
        db.get().query(sql, [strToxinName], (err, result) => {
            if (err) return cb(err);

            console.log(result.length);
            if (result.length == 0) {
                return cb(null, true, result);
            }

            else {
                return cb(null, false, result);
            }
        });
    }

    let insertToxin = function () {
        let sql = "INSERT INTO toxin_t (name,structureFeature,function,status,staffID,dateTime) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql1 = "INSERT INTO bacteriatoxin_t (bacteriumID,toxinID) VALUES (?,?)";
        let sql2 = "INSERT INTO request_t (dateTime, status,staffName, addedData, staffID, category,addedID,state,assignID) VALUES (CURRENT_TIMESTAMP,?,?,?,?,?,?,?,?)";
        db.get().query(sql, [strToxinName, strStructureFeature, strFunction, status, req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql1, [selectBacteria, result.insertId], (err1, result1) => {
                if (err1) return next(result1);
                db.get().query(sql2, [status, name, strToxinName, req.session.staffID, category, result.insertId, state, req.session.staffData.journalID], (err2, result2) => {
                    if (err2) return next(err2);
                    res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });
                });
            });
        });
    }

    checkToxin((error, result, data) => {
        if (error) return next(error);

        if (result) {
            insertToxin();
        }

        else {
            res.status(200).send({detail: "Toxin already exists assign Bacteria!", data:data, error: 1});
        }
    });

}

exports.toSelectBacteria = (req, res, next) => {
    let sql10 = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
    db.get().query(sql10, (err10, result10) => {
        if (err10) return next(err10);

        res.status(200).send({ success: true, detail: "", data: result10});
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
    let animalStatus = 1;
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;

    let checkBacteria = (cb) => {
        let sql11 = "SELECT bacteriumScientificName, bacteriumID FROM bacteria_t WHERE bacteriumScientificName = ?";
        let sql12 = "SELECT * FROM animalbacteria_t WHERE bacteriumID = ? AND animalID =? AND status = ?";
        db.get().query(sql11, [strScientificName], (err11, result11) => {
            if (err11) return cb(err11);
            if(result11.length == 0) {
                return cb(null, true);
            }
            else{
                db.get().query(sql12,[result11[0].bacteriumID,animalID,animalStatus],(err12,result12)=>{
                    if(err12) return next(err12);
                    console.log(result12);
                    if (result12.length == 0) {
                        
                        return cb(null, false,0,result11);
                    }
                    else {
                        console.log("nageexists na yung match");
                        console.log(result12);
                        return cb(null,false,1);
                    }
                });
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
        let sql = "INSERT INTO bacteria_t (bacteriumSpeciesName, bacteriumGenusName, bacteriumScientificName,bacteriumTissueSpecifity,bacteriumSampleType,bacteriumIsolation,bacteriumIdentification,bacteriumTaxoID,journalID,status,staffID,dateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql1 = "INSERT INTO request_t (dateTime,status,staffName, addedData, staffID,category,addedID,state,assignID) VALUES (CURRENT_TIMESTAMP,?,?,?,?,?,?,?,?)";
        let sql2 = "INSERT INTO animalbacteria_t (animalID,bacteriumID,status) VALUES (?,?,?)";
        db.get().query(sql, [strSpeciesName, strGenusName, strScientificName, strTissueSpecifity, strSampleType, strMethodOfIsolation, strMethodOfIdentification, result[0].bacteriumTaxoID, req.session.staffData.journalID, status, req.session.staffID], (err, resulta) => {
            if (err) return next(err);
            db.get().query(sql1, [status, name, strScientificName, req.session.staffID, category, resulta.insertId, state, req.session.staffData.journalID], (err1, result1) => {
                if (err1) return next(err1);
                db.get().query(sql2,[animalID,resulta.insertId,animalStatus],(err2,result2)=>{
                    if(err2) return next(err2);
                    res.status(200).send({ success: true, detail: "Successfully Submitted to Admin!" });
                });
            });
        });
    };

    checkBacteria((error, result,check,dataDisplay) => {
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
        else if(!result && check==0){
            res.status(200).send({ success: false, detail: "Bacteria already exists assign an Animal!", error: 4,data:dataDisplay});
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already Exists!", error: 5});
        }
    });
}

exports.bacteriaList = (req, res, next) => {
    let sql = "SELECT * FROM bacteria_t WHERE staffID =?";
    db.get().query(sql, [req.session.staffID], (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports.viewBacteria = (req, res, next) => {
    let id = req.params.id;
    let status = 1;

    let sql = "SELECT * FROM bacteria_t WHERE bacteriumID = ?";
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
                status                  : result[0].status
            }
    
            res.status(200).send({success: true, detail:"", data:dataDisplay});
        });

    });
}

exports.bacteriaHost = (req,res,next) =>{
    let data = req.body;
    let animalID = data.toModal;
    let bacteriumID = data.toBacteria;
    let animalStatus = 1;

    let insertHost = ()=>{
        let sql = "INSERT INTO animalbacteria_t (animalID, bacteriumID,status) VALUES (?,?,?)";
        db.get().query(sql,[animalID,bacteriumID,animalStatus],(err,result)=>{
            if(err) return next(err);

            res.status(200).send({success:true, detail:"Successfully Added!", data:result});
        });
    }

    let checkHost = (cb)=>{
        let sql = "SELECT * FROM animalbacteria_t WHERE animalID =? AND bacteriumID =? AND status=?";
        db.get().query(sql,[animalID,bacteriumID,animalStatus],(err,result)=>{
            if(err) return cb(err,result);

                if(result.length == 0){
                    return cb(null,true);
                }
                else{
                    return cb(null,false);
                }
        });
    }

    checkHost((error,result)=>{
        if(error) return next(error);
        if(result){
            insertHost();
        }
        else{
            res.status(200).send({success:false, detail:"Data Already Exists!", data:result});
        }
    });
}

///// TO BE CONTINUED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.addCarrier = (req,res,next) => {
    let toxinID = req.body.forToxin;
    let bacteriumID = req.body.toModal;

    let insertCarrier = ()=>{
        let sql = "INSERT INTO bacteriatoxin_t (toxinID, bacteriumID) VALUES (?,?)";
        db.get().query(sql,[toxinID,bacteriumID],(err,result)=>{
            if(err) return next(err);

            res.status(200).send({success:true, dsetail:"Successfully Added!", data:result});
        });
    }

    let checkHost = (cb)=>{
        let sql = "SELECT * FROM bacteriatoxin_t WHERE toxinID =? AND bacteriumID =?";
        db.get().query(sql,[toxinID,bacteriumID],(err,result)=>{
            if(err) return cb(err,result);

                if(result.length == 0){
                    return cb(null,true);
                }
                else{
                    return cb(null,false);
                }
        });
    }

    checkHost((error,result)=>{
        if(error) return next(error);
        if(result){
            insertCarrier();
        }
        else{
            res.status(200).send({success:false, detail:"Data Already Exists!", data:result});
        }
    });
    console.log(toxinID, bacteriumID);
}