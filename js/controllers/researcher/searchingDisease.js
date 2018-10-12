const db = require('../../connection');
const search = require('./searchingBacteria').search;

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
function getBacteriaCausingDisease(){
    return new Promise((resolve, reject)=>{
        let output = [];

        let offset = 0;
        let limit = 100;

        function searchSet(_offset){
            if(output.length == limit){
                resolve(output);
                return;
            }

            // Can't finish im sleepy na :'(((((
        }
    });
}

