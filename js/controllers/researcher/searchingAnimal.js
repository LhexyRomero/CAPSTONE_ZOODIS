const db = require('../../connection');

exports.searchingAnimal = (req,res,next) =>{
    let data = req.body;
    console.log(data);
    let animalName = data.animalName;
    let status = 'approved';
    let active  = 1;

    let searchedAnimal = ()=> {
        let sql = "SELECT * FROM animal_t WHERE animalName = ? AND status =?";
        let sql1 = "SELECT * FROM animaltaxo_t WHERE animalTaxoID = ?";
        let sql2 = "SELECT bacteria_t.bacteriumID,bacteriumScientificName FROM animalbacteria_t INNER JOIN bacteria_t on animalbacteria_t.bacteriumID = bacteria_t.bacteriumID WHERE animalID =? AND animalbacteria_t.status=?";
        let sql3 = "SELECT name,doi FROM journal_t WHERE journalID =?";
        db.get().query(sql,[animalName,status],(err,result)=>{
            if(err) return next(err);
            db.get().query(sql1,[result[0].animalTaxoID],(err1,result1)=>{
                if(err1) return next(err1);
                db.get().query(sql2,[result[0].animalID,active],(err2,result2)=>{
                    if(err2) return next(err2);
                    db.get().query(sql3,[result[0].journalID],(err3,result3)=>{
                        if(err3) return next(err3);
                        let dataDisplay = {
                            name            :   result[0].animalName,
                            scientificName  :   result[0].animalScientificName,
                            image           :   result[0].image.replace(/js\\public/g,"assets"),
                            phylum          :   result1[0].phylum,
                            classs          :   result1[0].class,
                            orderr          :   result1[0].orderr,
                            family          :   result1[0].family,
                            genus           :   result1[0].genus,
                            species         :   result1[0].species,
                            journal         :   result3[0].name,
                            doi             :   result3[0].doi,
                            bacteria        :   result2
                        }
                        res.locals = dataDisplay;
                        next();
                    });
                });
            });
        });
    }

    let checkAnimal = (cb)=>{
        let sql = "SELECT * FROM animal_t WHERE animalName =?";
        db.get().query(sql,[animalName],(err,result)=>{
            if(err) return cb(err);

            if (result.length == 0) {
                return cb(null, false);
            }
            else {
                return cb(null, true);
            }
        });
    }

    checkAnimal((error, result) => {
        if (error) return next(error);

        if (result) {
            searchedAnimal();
        }
        else {
            res.locals={};
            next();
        }
    });
}

exports.animalModules = (req,res,next) =>{

    let sql = "SELECT * FROM animal_t";
    db.get().query(sql,(err,result)=>{
        if (err) return next (err);

        res.status(200).send({success:true,detail:"",data:result});
    });
}
