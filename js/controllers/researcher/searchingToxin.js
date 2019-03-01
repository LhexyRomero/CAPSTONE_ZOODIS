const db = require('../../connection');

exports.toxinModule = (req,res,next) =>{
    let status = 'approved';
    let sql = "SELECT toxin_t.toxinID, structureFeature, name,bacteriumScientificName FROM toxin_t INNER JOIN bacteriatoxin_t ON bacteriatoxin_t.toxinID = toxin_t.toxinID INNER JOIN bacteria_t ON bacteria_t.bacteriumID = bacteriatoxin_t.bacteriumID WHERE toxin_t.status = ?";
    db.get().query(sql,[status],(err,result)=>{
        res.status(200).send({success:true,detail:"",data:result});
    });
}

exports.viewToxin = (req,res,next)=>{

    let id = req.query.toxinID;
    let sql = "SELECT function,toxin_t.toxinID, structureFeature, name,bacteriumScientificName FROM toxin_t INNER JOIN bacteriatoxin_t ON bacteriatoxin_t.toxinID = toxin_t.toxinID INNER JOIN bacteria_t ON bacteria_t.bacteriumID = bacteriatoxin_t.bacteriumID WHERE toxin_t.toxinID = ?";
    db.get().query(sql,[id],(err,result)=>{

        let dataDisplay = {
            toxinName           : result[0].name,
            bacteria            : result[0].bacteriumScientificName,
            structureFeature    : result[0].structureFeature,
            func                : result[0].function
        }
        console.log(result);
        res.locals = dataDisplay;
        next();
    });
}
