const db = require('../../connection');

exports.animalName = (req,res,next) =>{
    let sql ="SELECT animalName FROM animal_t WHERE animalName LIKE ?";
    let query = "%" + req.query.data + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.animalName);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.diseaseName = (req,res,next) =>{
    let sql = `
    select 
    animalID as id,
    animalName as name,
    'animal' as tb_name
    FROM animal_t as a
    WHERE a.animalName LIKE ?
    
    UNION ALL 
    
    select
    bacteriumID as id,
    bacteriumScientificName as name,
    'bacteria' as tb_name
    FROM bacteria_t as b
    WHERE b.bacteriumScientificName LIKE ?
    `;
    let query = "%" + req.query.data + "%";
    db.get().query(sql,[query, query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element);
            if(index == result.length-1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.bacteriaScientificName = (req,res,next) =>{
    let sql = "SELECT bacteriumScientificName FROM bacteria_t WHERE bacteriumScientificName LIKE ?";
    let query = "%" + req.query.data + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data = [];
        result.forEach((element,index) => {
            data.push(element.bacteriumScientificName);
            if(index == result.length-1){
                res.status(200).send({data:data});
            }
        });
    });
}

