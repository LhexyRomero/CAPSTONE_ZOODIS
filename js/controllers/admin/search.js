const db = require("../../connection");

let bacteriaTaxo = {};

exports.animal = (req, res, next) => {
    let sql = "SELECT genus, species FROM animaltaxo_t WHERE genus LIKE ? OR species LIKE ?";
    let query = "%" + req.query.data + "%";
    db.get().query(sql, [query, query], (err, result) => {
        if (err) return next(err);
        let data = [];
        result.forEach((element, index) => {
            data.push(element.genus + " " + element.species);
            if (index == result.length - 1) {
                res.status(200).send({ data: data });
            }
        });
    });
};

exports.bacteriaSpecies = (req, res, next) => {
    let sql = "SELECT species FROM bacteriataxo_t WHERE species LIKE ?";
    let query = "%" + req.query.data + "%";
    db.get().query(sql, [query], (err, result) => {
        if (err) return next(err);
        let data = [];
        result.forEach((element, index) => {
            data.push(element.species);
            if (index == result.length - 1) {
                res.status(200).send({ data: data });
            }
        });
    });
}

exports.bacteriaGenus = (req, res, next) => {

    let sql = "SELECT genus FROM bacteriataxo_t WHERE genus LIKE ? AND species = ?";
    let query = "%" + req.query.data + "%";
    let species = req.query.species;
    db.get().query(sql, [query, species], (err, result) => {
        if (err) return next(err);
        let data = [];
        result.forEach((element, index) => {
            data.push(element.genus);
            if (index == result.length - 1) {
                res.status(200).send({ data: data });
            }
        });
    });

}

exports.bacteriaSpeciesTaxo = (req, res, next) => {
    const bacdive = require('../../bacdive');
    let genus = req.query.genus || null;
    let query = new RegExp(req.query.data, "g");
    if(!genus) return res.status(200).send({data: []});
    if(bacteriaTaxo[genus.toUpperCase()]){
        let data = bacteriaTaxo[genus.toUpperCase()];
        var out = [];
        if(data.length == 0) return res.status(200).send({data: []});
        data.forEach((e,i)=>{
            if(e.species_epithet.search(query) != -1){
                if(out.indexOf(e.species_epithet) == -1){
                    out.push(e.species_epithet);
                }
            }
            if(i==data.length-1){
                res.status(200).send({data: out});
            }
        });
    }else{
        bacdive.searchSpecies(genus, function(err, data){
            if(err) return next(err);
            if(data.length == 0) return res.status(200).send({data: []});
            console.log('done getting:', genus);
            bacteriaTaxo[genus.toUpperCase()] = data;
            exports.bacteriaSpeciesTaxo(req, res, next);
        });
    }
}

exports.bacteriaSpeciesTaxoData = (req, res, next) => {
    if(req.query.genus && req.query.species){
        let genus = bacteriaTaxo[req.query.genus.toUpperCase()];
        if(genus){
            let species = genus[genus.findIndex(x=>x.species_epithet == req.query.species)];
            res.status(200).send({success: true, data: species});
        }else{
            res.status(200).send({success: true, data: {}});
        }
    }else{
        res.status(200).send({success: true, data: {}});
    }
}