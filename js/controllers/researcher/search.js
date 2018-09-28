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