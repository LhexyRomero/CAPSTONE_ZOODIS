const db = require('../../connection');

exports.aPhylum = (req,res,next) =>{
    let sql ="SELECT DISTINCT phylum FROM ac_animal_t WHERE phylum LIKE ?";
    let query = "%" + req.query.aPhylum + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.phylum);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.aClass = (req,res,next) =>{
    let sql ="SELECT DISTINCT class FROM ac_animal_t WHERE class LIKE ?";
    let query = "%" + req.query.aClass + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.class);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.aOrder = (req,res,next) =>{
    let sql ="SELECT DISTINCT orderr FROM ac_animal_t WHERE orderr LIKE ?";
    let query = "%" + req.query.aOrder + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.orderr);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.aFamily = (req,res,next) =>{
    let sql ="SELECT DISTINCT family FROM ac_animal_t WHERE family LIKE ?";
    let query = "%" + req.query.aFamily + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.family);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.aGenus = (req,res,next) =>{
    let sql ="SELECT DISTINCT genus FROM ac_animal_t WHERE genus LIKE ?";
    let query = "%" + req.query.aGenus + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.genus);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.aSpecies = (req,res,next) =>{
    let sql ="SELECT DISTINCT species FROM ac_animal_t WHERE species LIKE ?";
    let query = "%" + req.query.aSpecies + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.species);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.bPhylum = (req,res,next) =>{
    let sql ="SELECT DISTINCT phylum FROM ac_bacteria_t WHERE phylum LIKE ?";
    let query = "%" + req.query.bPhylum + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.phylum);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.bClass = (req,res,next) =>{
    let sql ="SELECT DISTINCT class FROM ac_bacteria_t WHERE class LIKE ?";
    let query = "%" + req.query.bClass + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.class);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.bOrder = (req,res,next) =>{
    let sql ="SELECT DISTINCT orderr FROM ac_bacteria_t WHERE orderr LIKE ?";
    let query = "%" + req.query.bOrder + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.orderr);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.bFamily = (req,res,next) =>{
    let sql ="SELECT DISTINCT family FROM ac_bacteria_t WHERE family LIKE ?";
    let query = "%" + req.query.bFamily + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.family);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.bGenus = (req,res,next) =>{
    let sql ="SELECT DISTINCT genus FROM ac_bacteria_t WHERE genus LIKE ?";
    let query = "%" + req.query.bGenus + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.genus);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}

exports.bSpecies = (req,res,next) =>{
    let sql ="SELECT DISTINCT species FROM ac_bacteria_t WHERE species LIKE ?";
    let query = "%" + req.query.bSpecies + "%";
    db.get().query(sql,[query],(err,result)=>{
        if(err) return next(err);
        let data =[];
        result.forEach((element,index) => {
            data.push(element.species);
            if(index == result.length -1){
                res.status(200).send({data:data});
            }
        });
    });
}


