const db = require('../../connection');

exports.bodySite = (req,res,next) =>{
    let sql = "SELECT cells FROM site_t WHERE cells LIKE ?";
    let query = "%" + req.query.data + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data = [];
        if(result.length == 0) return res.status(200).send({data:data});
        result.forEach((element,index) => {
            data.push(element.cells);
            if(index == result.length-1){
                res.status(200).send({data:data});
            }
        });
    });
}