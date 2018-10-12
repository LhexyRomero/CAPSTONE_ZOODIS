const db = require('../../connection');

exports.animalQuery = (req,res,next) =>{

    let sql = "SELECT DISTINCT COUNT(bacteriumID) as bacteriaQ, image,animalName FROM animalbacteria_t INNER JOIN animal_t ON animalbacteria_t.animalID = animal_t.animalID GROUP BY animalbacteria_t.animalID LIMIT 3";
    db.get().query(sql,(err,result)=>{
        if (err) return next (err);
        console.log(result);
        res.status(200).send({success:true,detail:"",data:result});
    });
}

exports.bacteriaQuery = (req,res,next) =>{
    let sql = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        console.log(result);
    });
}