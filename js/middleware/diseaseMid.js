const db = require("../connection");

exports.addDisease = (req, res, next) => {

    let data = req.body;
    let bacteriumID = data.selectBacteria;
    let diseaseName = data.strDiseaseName;
    let diseaseDesc = data.strDiseaseDesc;

    let symptoms = data.strSymptoms == null ? "" : data.strSymptoms == undefined ? "" : data.strSymptoms;

    symptoms += (data.symptoms0 == null || data.symptoms0 == undefined) ? "" : ":" + data.symptoms0;
    symptoms += (data.symptoms1 == null || data.symptoms1 == undefined) ? "" : ":" + data.symptoms1;
    symptoms += (data.symptoms2 == null || data.symptoms2 == undefined) ? "" : ":" + data.symptoms2;
    symptoms += (data.symptoms3 == null || data.symptoms3 == undefined) ? "" : ":" + data.symptoms3;
    symptoms += (data.symptoms4 == null || data.symptoms4 == undefined) ? "" : ":" + data.symptoms4;
    symptoms += (data.symptoms5 == null || data.symptoms5 == undefined) ? "" : ":" + data.symptoms5;
    symptoms += (data.symptoms6 == null || data.symptoms6 == undefined) ? "" : ":" + data.symptoms6;
    symptoms += (data.symptoms7 == null || data.symptoms7 == undefined) ? "" : ":" + data.symptoms7;
    symptoms += (data.symptoms8 == null || data.symptoms8 == undefined) ? "" : ":" + data.symptoms8;

    let checkDisease = function (cb) {
        let sql = "SELECT diseaseName, bacteriadisease_t.bacteriumID FROM disease_t INNER JOIN bacteriadisease_t ON disease_t.diseaseID = bacteriadisease_t.diseaseID WHERE diseaseName = ? AND bacteriadisease_t.bacteriumID = ?";
        db.get().query(sql, [diseaseName,bacteriumID], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, true);
            }
            else {
                return cb(null, false);
            }
        });
    }

    let insertDisease = function () {
        let sql1 = "INSERT INTO disease_t (diseaseName,diseaseDesc,symptoms) VALUES (?,?,?)";
        let sql2 = "INSERT INTO bacteriadisease_t (bacteriumID,diseaseID) VALUES (?,?)";
        db.get().query(sql1, [diseaseName, diseaseDesc, symptoms], (err1, result1) => {
            if(err1) return next(err1);
                db.get().query(sql2,[bacteriumID,result1.insertId],(err,result) =>{
                    if (err) return next(err);

                    res.status(200).send({success:true, detail:""}); 
                });
        });
    }

    checkDisease((error, result) => {
        if (error) return next(error);

        if (result) {
            insertDisease();
        }
        else {
            res.status(200).send({ success: false, detail: "Data Already exists!" });
        }
    });
}

exports.diseaseList = (req, res, next) => {

    let sql2 = "SELECT * FROM disease_t";
    db.get().query(sql2,(err2,result2)=>{
        if(err2) return next(err2);

        res.status(200).send({success: true, detail:"", data:result2});
    });
}

exports.viewDisease = (req,res,next) => {
    //console.log("here saview");
    let id = req.params.id;
    let data = req.body;

    let sql3 = "SELECT * FROM disease_t INNER JOIN bacteriadisease_t ON disease_t.diseaseID = bacteriadisease_t.diseaseID INNER JOIN bacteria_t ON bacteriadisease_t.bacteriumID = bacteria_t.bacteriumID WHERE disease_t.diseaseID = ?";
    db.get().query(sql3,[id],(err3,result3)=>{
        if(err3) return next(err3);

        let splittedSymptoms = result3[0].symptoms.split(":");
        console.log(splittedSymptoms);
        let dataDisplay = {
            
            bacteriumID     : result3[0].bacteriumID,
            bacteriumName   : result3[0].bacteriumScientificName,
            diseaseName     : result3[0].diseaseName,
            diseaseDesc     : result3[0].diseaseDesc,
            symptoms        : splittedSymptoms,
        }

        res.status(200).send({success: true, detail :"", data:dataDisplay});
    });
}

exports.editDisease = (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    let bacteriumID = data.selectBacteria;
    let sql = "UPDATE disease_t SET diseaseName = ?, diseaseDesc = ?, symptoms = ? WHERE diseaseID = ?";
    let sql1 = "UPDATE bacteriadisease_t SET bacteriumID =? , diseaseID =? WHERE diseaseID = ?";
    let error = 0;

    //Some validations here... 
    let queryData = [];
    queryData.push(data.modalName);
    queryData.push(data.modalDesc);
    queryData.push(data.symptoms);
    queryData.push(id);

    queryData.forEach((e)=>{
        if(e==undefined || e==null){
            error++;
        }
    });

    if(error == 0){
        db.get().query(sql, queryData, function(err, result){
            if(err) return next(err);
            db.get().query(sql1,[bacteriumID,id,id],(err1, result1)=>{
                res.status(200).send({success: true, detail: "Disease Successfully Modify"});
            });
        });
    }else{
        res.status(200).send({success: false, detail: "Invalid Data"});
    }
}

exports.toSelectBacteriaDisease = (req,res,next) =>{
    let sql = "SELECT bacteriumID, bacteriumScientificName FROM bacteria_t";
    db.get().query(sql,(err,result)=>{

        res.status(200).send({success: true, detail:"", data:result});
    });
}