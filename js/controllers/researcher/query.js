const db = require('../../connection');

exports.animalQuery = (req,res,next) =>{

    let sql = "SELECT DISTINCT COUNT(bacteriumID) as bacteriaQ, image,animalName FROM animalbacteria_t INNER JOIN animal_t ON animalbacteria_t.animalID = animal_t.animalID GROUP BY animalbacteria_t.animalID LIMIT 3";
    db.get().query(sql,(err,result)=>{
        if (err) return next (err);
        res.status(200).send({success:true,detail:"",data:result});
    });
}

exports.bacteriaQuery = (req,res,next) =>{
    let sql = "SELECT DISTINCT COUNT(toxinID) AS countToxin, bacteriumID FROM bacteriatoxin_t GROUP BY bacteriumID ORDER BY countToxin DESC LIMIT 1";
    let sql1 = "SELECT DISTINCT COUNT(toxinID) AS countToxin1, bacteriumID FROM bacteriatoxin_t GROUP BY bacteriumID ORDER BY countToxin1 ASC LIMIT 1";
    let sqlExtend = "SELECT bacteriumScientificName,pathogenic FROM bacteria_t WHERE bacteriumID =?";
    let sqlExtend1 = "SELECT bacteriumScientificName,pathogenic FROM bacteria_t WHERE bacteriumID =?";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        db.get().query(sqlExtend,[result[0].bacteriumID],(errExtend,resultExtend)=>{
            if(errExtend) next(errExtend);
            db.get().query(sql1,(err,result1)=>{
                if(err) return next(err);
                db.get().query(sqlExtend1,[result1[0].bacteriumID],(errExtend1,resultExtend1)=>{
                    if(errExtend1) next(errExtend1);
                        
                    let dataDisplay = {
                        stCount         :   result[0].countToxin,
                        ndCount         :   result1[0].countToxin1,
                        stBac           :   resultExtend[0].bacteriumScientificName,
                        ndBac           :   resultExtend1[0].bacteriumScientificName,
                        stPath          :   resultExtend[0].pathogenic,
                        ndPath          :   resultExtend1[0].pathogenic,   
                        
        
                    }
                    res.status(200).send({success:true, detail:"",data:dataDisplay});
                });
            }); 
        });
    });
}

exports.numberBacteria = (req,res,next) =>{
    let sql = "SELECT COUNT(bacteriumID) AS patho FROM bacteria_t WHERE pathogenic = 1";
    let sql1 = "SELECT COUNT(bacteriumID) AS potenPatho FROM bacteria_t WHERE pathogenic = 0";

    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,(err1,result1)=>{
            if(err1) return next(err1);
            let dataDisplay = {
                patho       :   result[0].patho,
                potentPatho :   result1[0].potenPatho
            }
            res.status(200).send({success:true,detail:"",data:dataDisplay});
        });
    });
}