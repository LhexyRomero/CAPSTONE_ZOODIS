const db = require('../../connection');

exports.searchingDisease = (req,res,next)=>{

    let data = req.body;
    let diseaseName = data.diseaseName;

    let searchedDisease = ()=>{

        let sql = "SELECT * FROM disease_t WHERE diseaseName=?";
        /* let sql = "SELECT"; */
    }

    let checkDisease = (cb)=>{
        let sql = "SELECT * FROM disease_t WHERE diseaseName =?";
        db.get().query(sql,[diseaseName],(err,result)=>{
            if(err) return cb(err);

            if (result.length == 0) {
                return cb(null, false);
            }

            else {
                return cb(null, true);
            }
        });
    }

    checkDisease((error, result) => {
        if (error) return next(error);

        console.log(result);
        if (result) {
            searchedDisease();
        }
        else {
            res.locals={};
            next();
        }
    });
}

exports.diseaseModules = (req,res,next) =>{

    let sql ="SELECT * FROM disease_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next (err);

        console.log(result);
        res.status(200).send({success:true,detail:"",data:result});
    });
}