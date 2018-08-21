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
    let journal = data.selectJournal;
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;
   
    let insertBacteriaTaxon = function () {
        let sql = "INSERT INTO bacteriataxo_t (phylum, class, orderr, family, genus, species,status,journalID,staffID,date) VALUES (?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql2 = "INSERT INTO notification_t (dateTime, status, staffName, addedData, staffID) VALUES (CURRENT_TIMESTAMP, ?, ?, ?, ?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies,status,journal,req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql2, [status, name, strGenus + " " + strSpecies, req.session.staffID], (err2, result2) => {
                if (err2) return next(err2);
            
                res.status(200).send({ success: true, detail: "Successfuly Submitted to Admin!", data: result });
            });
            
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
    let selectBacteria  = data.selectBacteria;
    let strToxinName = data.strToxinName;
    let strStructureFeature = data.strStructureFeature;
    let strFunction = data.strFunction;
    let status = "pending";

    let checkToxin = function (cb) {
        let sql = "SELECT * FROM toxin_t INNER JOIN bacteriatoxin_t ON toxin_t.toxinID = bacteriatoxin_t.toxinID WHERE toxin_t.toxinID = ? AND name = ?";
        db.get().query(sql, [selectBacteria,strToxinName], (err, result) => {
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
        let sql = "INSERT INTO toxin_t (name,structureFeature,function,status,staffID,date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)";
        let sql1 = "INSERT INTO bacteriatoxin_t (bacteriumID,toxinID) VALUES (?,?)";
        db.get().query(sql, [strToxinName, strStructureFeature, strFunction,status,req.session.staffID], (err, result) => {
            if (err) return next(err);
            db.get().query(sql1,[selectBacteria,result.insertId],(err1,result1)=>{
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
    let sql10 = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
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

exports.addBacteria = (req, res, next) => {

    console.log("ADD KA NA");
    let data = req.body;
    let animalID = data.toSelect;
    let strSpeciesName = data.strSpeciesName;
    let strGenusName = data.strGenusName;
    let strScientificName = strGenusName + ' ' + strSpeciesName;
    let strTissueSpecifity = data.strTissueSpecifity;
    let isInserting = data.isInserting;

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
        let sql = "INSERT INTO bacteria_t (bacteriumSpeciesName, bacteriumGenusName, bacteriumScientificName,bacteriumTissueSpecifity,animalID,bacteriumTaxoID) VALUES (?,?,?,?,?,?)";
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
            db.get().query(sql, [strSpeciesName, strGenusName, strScientificName, strTissueSpecifity, animalID, result[0].bacteriumTaxoID], (err, result) => {
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

exports.toxinList = (req, res, next) => {
    let sql = "SELECT * FROM toxin_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        res.status(200).send({ success: true, detail: "", data: result });
    });
}

exports. viewToxin = (req,res,next) =>{
    let id = req.params.id;

    let sql = "SELECT * FROM toxin_t WHERE toxinID = ?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);

        let dataDisplay = {
            name        :   result[0].name,
            feature     :   result[0].structureFeature,
            func        :   result[0].function,
            status      :   result[0].status
        }
        res.status(200).send({success:true, detail:"", data:dataDisplay});
        
    });
}

exports.toSelectAnimal = (req, res, next) => {
    
    console.log("PLSSSSSSSSSSSSSSSSSS");
    let sql = "SELECT animalID, animalScientificName FROM animal_t";
    db.get().query(sql, (err, result) => {
        if (err) return next(err);

        console.log(result);
        res.status(200).send({ success: true, detail: "", data: result});
    });
}