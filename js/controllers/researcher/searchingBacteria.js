const db = require('../../connection');

/**
 *    This would search a piece of string for matching term on token array
 */
function search(token, strSearch, cb) {
    let matchCount = 0;

    token.forEach((element, index) => {
        let regexp = new RegExp(element, 'gi');
        let result = strSearch.match(regexp); // nagrereturn to ng null pag no match, then array if meron,
        if (result) { // si result is array, array ng matchs. soo yung bilang nila pag nag result.length ka we add it sa matchCount
            matchCount += result.length;
        }
        if (index == token.length - 1) { // Para malaman natin kung ending na ba nung loop.
            cb(matchCount);
        }
    });
}

/** 
 *    we need to get the toxins of a bacteria,
 *    mag ququery ka dito. di to middleware :3
 */
function getBacteriaToxin(bacteria, cb) {

    let sql = "SELECT * FROM bacteriatoxin_t WHERE bacteriumID = ?";
    db.get().query(sql, [bacteria], (err, result) => {
        if (err) return cb(err);
        cb(null, result);
    });
}

/**
 *   Get Toxins name.
 */
function getToxinName(toxinIDs, cb){
    let sql = "SELECT name FROM toxin_t WHERE toxinID = ?";
    var promises = [];
    toxinIDs.forEach((e,i)=>{
        promises.push(new Promise((resolve,reject)=>{
            var id = e.toxinID;
            db.get().query(sql, [id], function(err, result){
                if(err) reject(err);
                resolve(result[0].name);
            });
        }));
        if(i == toxinIDs.length-1){
            Promise.all(promises).then(results=>{
                cb(null, results)
            }).catch(reason=>{
                cb(new Error(reason));
            });
        }
    });
}

/**
 * Get Disease by page.
 * @param {Number} offset Start point
 * @param {Number} limit number of result to return
 * @param {Function} cb 
 */
function getDisease(offset, limit, cb){
    let sql = "SELECT diseaseID, diseaseName, diseaseDesc FROM disease_t ORDER BY diseaseID ASC LIMIT ?,?";
    db.get().query(sql, [offset,limit], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

/**
 * Process All Data and look for match, this is subject to change of algorithm, 
 * @param {String[]} toxinNames 
 * @param {Object[]} diseases 
 * @param {Function} cb 
 */
function processData(toxinNames, diseases, cb){
    let matches = [];
    let promises = [];
    diseases.forEach((e,i)=>{
        promises.push(new Promise((resolve,reject)=>{
            var disease = e;
            search(toxinNames, disease.diseaseDesc, matchCount=>{
                if(matchCount > 0){
                    matches.push(disease);
                    resolve(true);
                }else{
                    resolve(true);
                }
            });
        }));
        if(i == diseases.length-1){
            Promise.all(promises).then(()=>{
                cb(null, matches);
            }).catch(reason=>{
                cb(new Error(reason));
            });
        }
    });
}

/**
 * we need to find the bacteriaID of user inputted string. eto talaga yung middleware
 */
exports.searchingBacteria = (req,res,next) =>{
    let data = req.body;
    let bacteria = data.bacteriaScientificName;
    let sql = "SELECT * FROM bacteria_t INNER JOIN bacteriataxo_t ON bacteria_t.bacteriumTaxoID = bacteriataxo_t.bacteriumTaxoID WHERE bacteriumScientificName = ?";
    db.get().query(sql, [bacteria], (err, result) => {
        if (err) return next(err);
        if(result.length==0) return res.status(200).send({success: false, detail: "Invalid Bacteria Name"});
        getBacteriaToxin(result[0].bacteriumID, (errr, toxinIDs) => {
            if (errr) return next(errr);
            getToxinName(toxinIDs, function(er, toxinNames){
                if (er) return next(er);
                let offset = 0;
                let limit = 100;
                getDisease(offset,limit, (e, disease)=>{
                    if(e) return next(e);
                    toxinNames.push(bacteria);
                    processData(toxinNames, disease, function(error, matchResult){
                        if(error) return next(error);
                        res.locals.matchResult = matchResult;
                        res.locals.bacteria = result[0];
                        res.locals.toxinNames = toxinNames;

                        console.log(res.locals.matchResult);
                        console.log(res.locals.bacteria);
                        console.log(res.locals.toxinNames);
                        next();
                    });
                });
            });
        });
    });
}