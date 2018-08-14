const db = require('../connection');

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