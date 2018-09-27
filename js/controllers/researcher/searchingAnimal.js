const db = require('../../connection');

exports.searchingAnimal = (req,res,next) =>{
    let data = req.body;
    let animalName = data.animalName;
    let status = 'approved';

    let sql = "SELECT animalName, animalScientificName,animalTaxoID, image,bacteriumScientificName,bacteriumTissueSpecifity,bacteriumSampleType,bacteriumIsolation,bacteriumIdentification,bacteriumTaxoID FROM animal_t JOIN bacteria_t ON animal_t.animalID = bacteria_t.animalID WHERE animalName = ? AND bacteria_t.status =? AND animal_t.status =?";
    db.get().query(sql,[animalName,status,status],(err,result)=>{
        if(err) return next(err);

        
    });
}

