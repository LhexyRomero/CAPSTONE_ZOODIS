const db = require("../connection");

exports.addBacteriaTaxon = (req, res, next) => {
    let data = req.body;

    let strPhylum = data.strPhylum;
    let strClass = data.strClass;
    let strOrder = data.strOrder;
    let strFamily = data.strFamily;
    let strGenus = data.strGenus;
    let strSpecies = data.strSpecies;

    let insertBacteriaTaxon = function () {
        let sql = "INSERT INTO bacteriataxo_t (phylum, class, orderr, family, genus, species) VALUES (?,?,?,?,?,?)";
        db.get().query(sql, [strPhylum, strClass, strOrder, strFamily, strGenus, strSpecies], (err, result) => {
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

    let sql2 = "SELECT * FROM bacteriataxo_t";
    db.get().query(sql2, (err2, result2) => {
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

        res.status(200).send({ success: true, detail: "Successfully Updated" });
    });
}

exports.addToxin = (req, res, next) => {

    let data = req.body;
    let strToxinName = data.strToxinName;
    let strStructureFeature = data.strStructureFeature;
    let strFunction = data.strFunction;

    let checkToxin = function (cb) {
        let sql5 = "SELECT * FROM toxin_t WHERE name =?";
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
        let sql6 = "INSERT INTO toxin_t (name,structureFeature,function) VALUES (?,?,?)";
        db.get().query(sql6, [strToxinName, strStructureFeature, strFunction], (err6, result6) => {
            if (err6) return next(err6);

            res.status(200).send({ success: true, detail: "", data: result6 });
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
    let sql7 = "SELECT * FROM toxin_t";
    db.get().query(sql7, (err7, result7) => {
        if (err7) return next(err7);

        res.status(200).send({ success: true, detail: "", data: result7 });
    });
}

exports.editToxin = (req, res, next) => {
    id = req.params.id;

    let sql8 = "SELECT * FROM toxin_t WHERE toxinID =?";
    db.get().query(sql8, [id], (err8, result8) => {
        if (err8) return next(err8);

        let dataDisplay = {
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

    let strToxinName = data.modalToxinName;
    let strStructureFeature = data.modalStructureFeature;
    let strFunction = data.modalFunction;

    let sql9 = "UPDATE toxin_t SET name = ?, structureFeature = ?, function = ?  WHERE toxinID = ?";
    db.get().query(sql9, [strToxinName, strStructureFeature, strFunction, id], (err9, result9) => {
        if (err9) return next(err9);

        res.status(200).send({ success: true, detail: "" });
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
    let strGramStain = data.strGramStain;
    let strLength = data.strLength;
    let strWidth = data.strWidth;
    let strShape = data.strShape;
    let strMotility = data.strMotility;
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
        let sql = "INSERT INTO bacteria_t (bacteriumSpeciesName, bacteriumGenusName, bacteriumScientificName,bacteriumTissueSpecifity,bacteriumSampleType,bacteriumIsolation,bacteriumIdentification,bacteriumGramStain,bacteriumCellLength,bacteriumCellWidth,bacteriumCellShape,bacteriumMotility,animalID,bacteriumTaxoID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        let dataDisplay = {
            scientificName      : strScientificName,
            phylum              : result[0].phylum,
            class               : result[0].class,
            order               : result[0].orderr,
            family              : result[0].family,
            genus               : result[0].genus,
            species             : result[0].species
        }

        if(isInserting) {
            db.get().query(sql,[strSpeciesName,strGenusName,strScientificName,strTissueSpecifity,strSampleType,strMethodOfIsolation,strMethodOfIdentification,strGramStain,strLength,strWidth,strShape,strMotility,animalID,result[0].bacteriumTaxoID],(err,result) =>{
                if(err) return next(err);
                    res.status(200).send({success: true, detail: "Successfully Added!"});
            });

        }

        else {
            res.status(200).send({success: true, detail :"", data:dataDisplay});
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
            res.status(200).send({ success: false, detail: "Data Already Exists!", error:4 });
        }
    });
}