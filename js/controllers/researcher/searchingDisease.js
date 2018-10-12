const db = require('../../connection');

exports.searchingDisease = (req,res,next)=>{

    let data = req.body;
    let diseaseName = data.diseaseName;
    
    let output = { // Standard Output for this solution, every single function here provide and fill this variable till last one finished. Before returning it to view renderer
        name: "",
        desc: "",
        symptoms: [],
        preventions: [],
        bacteria: [],
        animal: [],
    }

    let searchedDisease = (disease)=>{
        output.name = disease.diseaseName;
        output.desc = disease.diseaseDesc;
        output.symptoms = disease.symptoms.split(':');

        Promise.all([
            getPrevention(disease.diseaseID),
            getBacteriaCausingDisease(disease),
        ]).then(function(results){
            output.preventions = results[0];
            output.bacteria = results[1];

            return new Promise((resolve,reject)=>{
                let promises = [];
                output.bacteria.forEach((e,i)=>{
                    promises.push(getAnimalCarrier(e.bacteriumID));
                    if(i==output.bacteria.length-1){
                        Promise.all(promises).then(results=>{
                            resolve(results[0]);
                        }).catch(reject);
                    }
                });
            }).then(animals=>{
                return new Promise((resolve, reject)=>{
                    let filltered = [];
                    animals.forEach((e,i)=>{
                        if(filltered.findIndex(x=>x.animalID==e.animalID) == -1){
                            filltered.push(e);
                        }
                        if(i==animals.length-1){
                            resolve(filltered);
                        }
                    });
                });
            }).then(animals=>{
                output.animal = animals;
                res.locals = output;
                next();
            });
        }).catch(reason=>{
            res.locals = output;
            next();
        });
    }

    let checkDisease = (cb)=>{
        let sql = "SELECT * FROM disease_t WHERE diseaseName =?";
        db.get().query(sql,[diseaseName],(err,result)=>{
            if(err) return cb(err);

            if (result.length == 0) {
                return cb(null, false);
            }

            else {
                return cb(null, result[0]);
            }
        });
    }

    checkDisease((error, result) => {
        if (error) return next(error);

        if (result) {
            searchedDisease(result);
        }
        else {
            res.locals={};
            next();
        }
    });
}

exports.diseaseModules = (req,res,next) =>{

    let sql ="SELECT diseaseID,diseaseName,diseaseDesc,doi FROM disease_t INNER JOIN journal_t ON disease_t.journalID = journal_t.journalID";
    db.get().query(sql,(err,result)=>{
        if(err) return next (err);

        console.log(result);
        res.status(200).send({success:true,detail:"",data:result});
    });
}
/**
 * This gets all prevention submitted and approved by the admin preventions.
 * and store all in one array.
 * @param {number} diseaseID 
 */
function getPrevention(diseaseID){
    return new Promise((resolve, reject)=>{
        let sql = "SELECT preventions FROM prevention_t WHERE diseaseID = ? AND status = 'approved'";
        db.get().query(sql, [diseaseID], function(err, results){ // array results of prevention submitted by user and approve by admin.
            if(err) return reject(err);
            let preventions = [];
            if(results.length == 0) return resolve(preventions);
            results.forEach((element,index)=> {                  // Loop to flatten all enrty in one array.
                let list = element.split(':');
                list.forEach((e,i)=>{
                    preventions.push(e);                         // Push single entry from splited(:) data per user.
                });
                if(index == results.length-1){
                    resolve(preventions);                        // Pass array of prevention on resolve callback
                }
            });
        });
    });
}

/**
 * Search algo, minified version of main bacteria search in vice versa order
 * where bacteria is given and disease should be the output
 * 
 * expecting the high volume of data to be process, this algo would take super long execution time and need to optimized, soo I suggest releasing first 100 found result.
 */
function getBacteriaCausingDisease(disease){
    return new Promise((resolve, reject)=>{
        let output = [];

        let offset = 0;
        let limit = 100;
        let bodySites = disease.bodySite.split(":");

        new Promise((res,rej)=>{
            let promises = [];
            bodySites.forEach((e,i)=>{
                promises.push(getBodySiteMatch(e).then(bacteria=>{
                    output = output.concat(bacteria);
                    return 1;
                }));
                if(i==bodySites.length-1){
                    Promise.all(promises).then(()=>{
                        res();
                    });
                }
            });
        }).then(()=>{
            resolve(output);
        });
    });
}

function getBodySiteMatch(bodysite){
    return new Promise((resolve, reject)=>{
        let sql = "SELECT * FROM bacteria_t WHERE bacteriumTissueSpecifity = ?";
        db.get().query(sql,[bodysite], function(err, results){
            if(err) return reject(err);
            resolve(results);
        });
    });
}

function getAnimalCarrier(bacteriumID){
    return new Promise((resolve, reject)=>{
        let sql = "SELECT animalID FROM animalbacteria_t WHERE bacteriumID = ? AND status = 1";
        let sql2 = "SELECT * FROM animal_t WHERE animalID = ?";
        db.get().query(sql, [bacteriumID], function(err, results){
            if(err) return reject(err);
            if(results.length == 0) return resolve([]);
            let promises = [];
            results.forEach((e,i)=>{
                promises.push(new Promise((res,rej)=>{
                    db.get().query(sql2, [e.animalID], function(err, results1){
                        if(err) return rej(err);
                        res(results1[0]);
                    });
                }));
                if(i==results.length-1){
                    Promise.all(promises).then(data=>{
                        resolve(data);
                    });
                }
            });
        });
    }).then(output=>{
        let a = [];
        a = output;
        return a;
    });
}