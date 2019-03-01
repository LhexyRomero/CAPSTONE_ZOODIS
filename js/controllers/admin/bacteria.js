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
        let sql5 = "SELECT toxinID, name FROM toxin_t WHERE name = ?"; 
        db.get().query(sql5, [strToxinName], (err5, result5) => {
            if (err5) return cb(err5);

            if (result5.length == 0) {
                return cb(null, true, null);
            }

            else {
                return cb(null, false, result5);
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

    checkToxin((error, result, data) => {
        if (error) return next(error);

        if (result) {
            insertToxin();
        }
        else {
            res.status(200).send({success: false, detail: "Toxin already exists assign Bacteria!", data:data});
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
    let animalStatus = 1;

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
                    
                    if (result12.length == 0) {
                        return cb(null, false,0,result11);
                    }
                    else {
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
        let sql1 = "INSERT INTO animalbacteria_t (animalID,bacteriumID,status) VALUES (?,?,?)";
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
            db.get().query(sql, [strSpeciesName, strGenusName, strScientificName, strTissueSpecifity, strSampleType, strMethodOfIsolation, strMethodOfIdentification, result[0].bacteriumTaxoID,journal,status,req.session.staffID], (err, result) => {
                if (err) return next(err);
                db.get().query(sql1,[animalID,result.insertId,animalStatus],(err1,result1)=>{
                    if(err1) return next(err1);
                    res.status(200).send({ success: true, detail: "Successfully Added!" });
                });
            });

        }

        else {
            res.status(200).send({ success: true, detail: "", data: dataDisplay });
        }
    };

    checkBacteria((error,result,check,dataDisplay) => {
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
                        res.status(200).send({ success: false, detail: "Genus not found!", error: 2 });
                    }

                    else if (!species && genus) {
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
        else if(!result && check==0){
            res.status(200).send({ success: false, detail: "Bacteria already exists assign an Animal!", error: 4 ,data:dataDisplay});
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already Exists!", error: 5});
        }
    });
}

exports.bacteriaList = (req, res, next) => {

    let status = "approved";
    let sql = "SELECT * FROM bacteria_t WHERE bacteria_t.status = ?;";
    db.get().query(sql,[status] ,(err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });

    });

}

exports.viewBacteria = (req,res,next) =>{
    let id = req.params.id;
    let status = 1;

    let sql = "SELECT * FROM bacteria_t INNER JOIN bacteriataxo_t ON bacteria_t.bacteriumTaxoID = bacteriataxo_t.bacteriumTaxoID WHERE bacteriumID = ?";
    let sql1 = "SELECT animalbacteria_t.bacteriumID, animalbacteria_t.animalID, animalName FROM animal_t INNER JOIN animalbacteria_t ON animal_t.animalID = animalbacteria_t.animalID WHERE bacteriumID = ? AND animalbacteria_t.status =?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[id,status],(err1,result1)=>{
            if(err1) return next(err1);
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

exports.updateBacteria = (req,res,next) => {

    let id = req.params.id;
    let data = req.body;
    console.log(data);

    let speciesName = data.modalSpeciesName;
    let genusName = data.modalGenusName;
    let scientificName = genusName+" "+speciesName;
    let tissue = data.modalTissue;
    let sample = data.modalSample;
    let isolation = data.modalIsolation;
    let identification = data.modalIdentification;


    let sql0 = "SELECT "
    let sql = "UPDATE bacteria_t SET  bacteriumTissueSpecifity =?, bacteriumSampleType =?, bacteriumIsolation =?, bacteriumIdentification =? WHERE bacteriumID = ?";
    db.get().query(sql,[tissue,sample,isolation,identification,id],(err,result) =>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"Successfully Updated!",});
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
    let status = "Incomplete";
    let name = "none";
    let sql = "SELECT journalID, code, name FROM journal_t WHERE status = ? AND name <> ?";
    db.get().query(sql,[status,name],(err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result});

    });
}

exports.toSelectBacteria3 = (req,res,next) =>{
    let sql = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
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

exports.deleteHostField = (req,res,next) =>{
    let bacteriumID = req.params.bacteriumID;
    let hostID = req.params.hostID;
    let status = 0;

    let sql = "UPDATE animalbacteria_t SET status = ? WHERE animalID = ? AND bacteriumID =?";
    db.get().query(sql,[status,hostID,bacteriumID],(err, result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"Removed Successfully!"});
    });
}

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

exports.toSelectAnimal = (req,res,next)=>{
    let sql = "SELECT animalName, animalID FROM animal_t";
    db.get().query(sql,(err, result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, data:result});
    });
}