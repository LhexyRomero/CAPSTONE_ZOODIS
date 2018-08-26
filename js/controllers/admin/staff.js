const db = require("../../connection");

exports.staffList = (req,res,next) =>{

    let sql = "SELECT * FROM staff_t";

    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });

}


exports.code = (req,res,next) =>{

    let data = req.body;
    let code = data.generate;
    let type = 3;
    console.log(type);
    let sql = "INSERT INTO staff_t (type,code) VALUES (?,?)";
    db.get().query(sql,[type,code],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:""});
    });
}