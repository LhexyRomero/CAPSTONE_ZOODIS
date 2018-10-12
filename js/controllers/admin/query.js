const db = require('../../connection');

exports.totalAnimal = (req,res,next)=>{
    let sql = "SELECT COUNT(animalID) as animalCount FROM animal_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result[0].animalCount});
    });
}

exports.totalDisease =(req,res,next)=>{
    let sql = "SELECT COUNT(diseaseID) as diseaseCount FROM disease_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result[0].diseaseCount});
    });
}

exports.totalPrevention =(req,res,next)=>{
    let sql = "SELECT COUNT(preventionID) as preventionCount FROM prevention_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result[0].preventionCount});
    });
}

exports.totalJournal = (req,res,next)=>{
    let sql = "SELECT COUNT(journalID) as journalCount FROM journal_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result[0].journalCount});
    });
}

exports.totalApproved = (req,res,next)=>{
    let status ="approved";
    let promises = [];
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(animalTaxoID) as axCount FROM animaltaxo_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].axCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(animalID) as aCount FROM animal_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].aCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(bacteriumTaxoID) as bxCount FROM bacteriataxo_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].bxCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(bacteriumID) as bCount FROM bacteria_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].bCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(diseaseID) as dCount FROM disease_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].dCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(preventionID) as pCount FROM prevention_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].pCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(toxinID) as tCount FROM toxin_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].tCount);
        });
    }));

    Promise.all(promises).then(result=>{
        let total = 0;
        result.forEach((element,index) => {
            total+=element;
        });
        res.status(200).send({success:true,detail:"",data:total});
    });

}

exports.totalReject = (req,res,next)=>{
    let status ="rejected";
    let promises = [];
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(animalTaxoID) as axCount FROM animaltaxo_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].axCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(animalID) as aCount FROM animal_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].aCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(bacteriumTaxoID) as bxCount FROM bacteriataxo_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].bxCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(bacteriumID) as bCount FROM bacteria_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].bCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(diseaseID) as dCount FROM disease_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].dCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(preventionID) as pCount FROM prevention_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].pCount);
        });
    }));
    promises.push(new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(toxinID) as tCount FROM toxin_t WHERE status=?";
        db.get().query(sql, [status], function(err, result){
            if(err) reject(err);
            resolve(result[0].tCount);
        });
    }));

    Promise.all(promises).then(result=>{
        let total = 0;
        result.forEach((element,index) => {
            total+=element;
        });
        res.status(200).send({success:true,detail:"",data:total});
    });

}

exports.totalCollaborators = (req,res,next)=>{
    let type = 3;
    let sql = "SELECT COUNT(staffID) as totalCollaborators FROM staff_t WHERE type =?";
    db.get().query(sql,[type],(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result[0].totalCollaborators});
    });
}

exports.completeJournal = (req,res,next)=>{
    let status = "completed";
    let sql = "SELECT COUNT(journalID) as completeJournal FROM journal_t WHERE status =?";
    db.get().query(sql,[status],(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result[0].completeJournal});
    });
}

exports.totalToxins = (req,res,next)=>{
    console.log("Q TOXINS");
    let sql = "SELECT COUNT(toxinID) as countToxins FROM toxin_t";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result[0].countToxins});
    });
}