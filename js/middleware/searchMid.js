const db = require('../connection');

exports.animal = function(req, res, next){
    let sql = "SELECT genus, species FROM animaltaxo_t WHERE genus REGEXP '["+ req.query.data +"]' OR species REGEXP '["+ req.body.data +"]'";
    db.get().query(sql, function(err, result){
        if(err) return next(err);
        let data = [];
        result.forEach((element,index)=>{
            data.push(element.genus + " " + element.species);
            if(index == result.length-1){
                res.status(200).send({data: data});
            }
        });
    });
};

exports.bacteria = function(req, res, next){

};