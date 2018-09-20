const request = require('request');
let loggedIn = 0;

exports.searchSpecies = function(genus, cb){
    let getList = new Promise(function(resolve, reject){
        sendReq("GET", "taxon/"+ genus +"/?format=json", {}, function(err, data){
            if(err) return reject(err);
            resolve(data.results);
        });
    });

    let getTaxo = function(id){
        return new Promise(function(resolve, reject){
            sendReq("GET", "bacdive_id/" + id + "?format=json", {}, function(err, data){
                if(err) return reject(err);
                resolve(data.taxonomy_name.strains[0]);
            });
        });
    };

    getList.then(taxoList=>{
        if(taxoList.length == 0) return cb(null, []);
        let promises = [];
        taxoList.forEach((e,i)=>{
            let taxonomy = e.url.split("/");
            promises.push(getTaxo(taxonomy[taxonomy.length-2]));
            if(i==taxoList.length-1){
                Promise.all(promises).then(taxoInfo=>{
                    cb(null, taxoInfo);
                }).catch(reason=>{
                    cb(reason);
                });
            }
        });
    }).catch(reason=>{
        cb(reason);
    });
}

function sendReq(method, query, data, cb){
    request({
        auth: {
            user: process.env.TAXO_API_USER,
            pass: process.env.TAXO_API_PASS
        },
        method: method,
        uri: process.env.TAXO_API_URL + query,
        json: data,
    }, function(err, response, body){
        if(err) return cb(err);
        if(response.statusCode >= 400){
            cb(new Error(response.statusCode + ":" + response.statusMessage));
        }else{
            cb(null, body);
        }
    });
}
