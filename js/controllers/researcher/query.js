const db = require('../../connection');

exports.animalQuery = (req,res,next) =>{

    let sql = "SELECT * FROM animal_t";
    db.get().query(sql,(err,result)=>{
        if (err) return next (err);

        res.status(200).send({success:true,detail:"",data:result});
    });
}