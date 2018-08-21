const db = require("../connection");

exports.toSelectDisease = (req,res,next) =>{
    let sql = "SELECT diseaseID, diseaseName FROM disease_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.addPrevention = (req,res,next) =>{
    
    let data = req.body;
    let diseaseID = data.selectDisease;
    let status = 'pending';

    let prevention = data.strPrevention == null ? "" : data.strPrevention == undefined ? "" : data.strPrevention;

    prevention += (data.prevention0 == null || data.prevention0 == undefined) ? "" : ":" + data.prevention0;
    prevention += (data.prevention1 == null || data.prevention1 == undefined) ? "" : ":" + data.prevention1;
    prevention += (data.prevention2 == null || data.prevention2 == undefined) ? "" : ":" + data.prevention2;
    prevention += (data.prevention3 == null || data.prevention3 == undefined) ? "" : ":" + data.prevention3;
    prevention += (data.prevention4 == null || data.prevention4 == undefined) ? "" : ":" + data.prevention4;
    prevention += (data.prevention5 == null || data.prevention5 == undefined) ? "" : ":" + data.prevention5;
    prevention += (data.prevention6 == null || data.prevention6 == undefined) ? "" : ":" + data.prevention6;
    prevention += (data.prevention7 == null || data.prevention7 == undefined) ? "" : ":" + data.prevention7;
    prevention += (data.prevention8 == null || data.prevention8 == undefined) ? "" : ":" + data.prevention8;

    let checkPrevention = (cb) =>{
        let sql = "SELECT * FROM prevention_t WHERE diseaseID = ?";
        db.get().query(sql,[diseaseID],(err,result)=>{
            if(err) return cb(err);

            if (result.length == 0) {
                return cb(null, true);
            }
            else {
                return cb(null, false);
            }
        });
    }

    let insertPrevention = () => {
        let sql = "INSERT INTO prevention_t (preventions,diseaseID,status) VALUES (?,?,?)";
        db.get().query(sql,[prevention,diseaseID,status],(err,result)=>{

            res.status(200).send({success: true, detail: "Successfully Submitted to Admin!"});
        });
    }

    checkPrevention((error, result) => {
        if (error) return next(error);

        if (result) {
            insertPrevention();
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already exists!" });
        }
    });
}

exports.preventionList = (req,res,next) => {
    let sql = "SELECT * FROM prevention_t INNER JOIN disease_t ON prevention_t.diseaseID = disease_t.diseaseID";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"", data:result});
    });
}

exports.viewPrevention = (req,res,next) => {
    let id = req.params.id;

    let sql3 = "SELECT * FROM prevention_t INNER JOIN disease_t ON prevention_t.diseaseID = disease_t.diseaseID WHERE preventionID = ?";
    db.get().query(sql3,[id],(err3,result3)=>{
        if(err3) return next(err3);

        let splittedPreventions = result3[0].preventions.split(":");
        let dataDisplay = {
            
            diseaseID       : result3[0].diseaseID,
            diseaseName     : result3[0].diseaseName,
            preventions     : splittedPreventions,
        }

        res.status(200).send({success: true, detail :"", data:dataDisplay});
    });
}