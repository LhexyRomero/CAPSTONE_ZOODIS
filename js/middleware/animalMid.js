const db = require("../connection");

exports.addAnimal = (req,res,next) =>{

    let data = req.body;
    let commonName = data.strCommonName;
    let scientificName = data.strScientificName.split(' ');
    let genusName = scientificName[0];
    let scienceName = data.strScientificName;
    let speciesName = scientificName[1];
    let bodySite = data.strBodySite;
   

    /**
     * This function: ichecheck kung existing na ba yung ilalagay ng user sa may database
     * @param cb Callback function
     */
    let checkAnimal = function(cb){
        let sql = "SELECT * FROM animal_t WHERE animalName =? AND animalScientificName = ?";
        db.get().query(sql,[commonName,scienceName,bodySite],(err, result) =>{
            if(err) return cb(err);
            if (result.length == 0) {
                return cb(null,true);
            }
            else{
                return cb(null,false);
            }
        });
    };

    /**
     * This function run when no species provided in the scientific name, 
     * also return set of suggestion to the client if ever a non-existing genus is provided.
     */
    let noGenus = function(){
        //kapag walang prinovide yung user ng species
        speciesName = "spp.";
        let sql = "SELECT animalTaxoID, phylum, class, orderr, family, genus FROM animaltaxo_t WHERE genus = ?";
        db.get().query(sql, [genusName],(err, result)=>{ //pagkuha ng result ng taxo classification by a genus
            if(err) return next(err);

            //Suggestion: if theres no Genus
            if(result.length == 0){
                let sql2 = "SELECT genus FROM animaltaxo_t WHERE genus REGEXP '["+ genusName +"]' Limit 10";
                db.get().query(sql2, (errr, result2)=>{
                    if(errr) return next(errr);
                    res.status(200).send({success: false, detail: "Genus not found", error:2, data: result2});
                });
            }

            else {
                insertAnimal(result);
            }
        });
    };

    /**
     * This Function: iinsert na ng system sa database yung ininput ng User
     * @param result ResultSet object, containing taxonomy of the animal.
     */
    let insertAnimal = function(result){
        let sql3 = "INSERT INTO animal_t (animalName, animalScientificName, animalBodySite, animalTaxoID) VALUES (?,?,?,?)";
        //db.get().query(sql3,[commonName,genusName+' '+speciesName,bodySite,result[0].animalTaxoID],(error,result3) => {
        //    if(error) return next(error);
            
            let dataDisplay = {
                commonName      : commonName,
                scientificName  : scientificName,
                bodySite        : bodySite,
                phylum          : result[0].phylum,
                class           : result[0].class,
                order           : result[0].orderr,
                family          : result[0].family,
                genus           : result[0].genus,
                species         : speciesName
            };

            //hawak niya yung data na ibibigay sa client
            res.status(200).send({success: true, detail: "", data:dataDisplay});
        //});
    };

    //Dito simula nung operation flow. puro declaration lang sa taas.
    checkAnimal((error,result)=>{ 
        if (error) return next(error);
        if(result) {     
            if(scientificName.length > 1){
                if(speciesName == "spp"){
                    noGenus();
                }     
                else{
                
                    //kapag kumpleto yung scientific name 
                    let sql = "SELECT * FROM animaltaxo_t WHERE species = ?";
                    db.get().query(sql, [speciesName], (err,result) =>{ //pagkuha ng result ng taxo classification by a species
                        if(err) return next(err);
                        
                        if(result.length == 0) {
                            let sql1 = "SELECT species FROM animaltaxo_t WHERE species REGEXP '["+ speciesName +"]'";
                            db.get().query(sql1,(errr,result1) => {
                                if(errr) return next(errr);
                            
                                res.status(200).send({success: false, detail: "Species not found", error: 3, data:result1});
                            });
                        }else{
                            insertAnimal(result);
                        }
                    })
                }
            }
            else {
                noGenus();
            }
        }
        else {
            res.status(200).send({success: false, error:1, detail: "Data Already Exists"});
        }
    }); 
};

exports.addAnimalTaxon = (req,res,next) =>{

    let data = req.body;

    let strPhylum = data.strPhylum;
    let strClass = data.strClass;
    let strOrder = data.strOrder;
    let strFamily = data.strFamily;
    let strGenus = data.strGenus;
    let strSpecies = data.strSpecies;

    let insertAnimalTaxon = function() {
        let sql4 = "INSERT INTO animaltaxo_t (phylum, class, orderr, family, genus, species) VALUES (?,?,?,?,?,?)";
        db.get().query(sql4,[strPhylum,strClass,strOrder,strFamily,strGenus,strSpecies],(err4, result4)=>{
            if(err4) return next(err4);

            res.status(200).send({success: true, detail: "Successfully Added!", data:result4});
        });
    }

    let checkAnimalTaxon = function(cb) {
        let sql5 = "SELECT * FROM animaltaxo_t WHERE species = ?";
        db.get().query(sql5,[strSpecies],(err5, result5)=>{
            if (err5) return cb(err5);

            if(result5.length == 0){
                return cb(null,true);
            }

            else{
                return cb(null,false);
            }
        });
    }

    checkAnimalTaxon ((error,result) =>{
        if(error) return next(error);

        if(result) {
            insertAnimalTaxon();
        }
        else{
            res.status(200).send({success:false, detail:"Data Already exists!"});
        }

    });
        




};

exports.animalTaxonList = (req,res,next) =>{

    let sql6 = "SELECT * FROM animaltaxo_t";
    db.get().query(sql6,(err6,result6)=>{
        if(err6) return next(err6);

        res.status(200).send({success:true, details:"", data:result6});
    });

}

exports.editAnimalTaxon = (req,res,next) =>{

    let id = req.params.id;

    let sql7 = "SELECT * FROM animaltaxo_t WHERE animalTaxoID = ?";
    db.get().query(sql7,[id],(err7,result7)=>{
        if(err7) return next(err7);

        let dataDisplay = {
            id              : result7[0].animalTaxoID,
            phylum          : result7[0].phylum,
            class           : result7[0].class,
            order           : result7[0].orderr,
            family          : result7[0].family,
            genus           : result7[0].genus,
            species         : result7[0].species,
        }

        res.status(200).send({success: true, detail: "", data:dataDisplay});
    });

}

exports.updateAnimalTaxon = (req,res,next) => {

    let id = req.params.id;
    let data = req.body;

    let strPhylum = data.modalPhylum;
    let strClass = data.modalClass;
    let strOrder = data.modalOrder;
    let strFamily = data.modalFamily;
    let strGenus = data.modalGenus;
    let strSpecies = data.modalSpecies;

    res.status(200).send();
};