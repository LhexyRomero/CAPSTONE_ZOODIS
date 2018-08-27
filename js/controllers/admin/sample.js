const db = require("../../connection");

function getDisease() {

}

function getBacteria() {

}

function bfs() {

}

function queryer () {

}

function search(cb) {

}

exports.sample = (req,res,next) =>{
    let data = req.body;
    let bacteria = data.searchBacteria;
    let sql = "SELECT * FROM bacteria_t WHERE bacteriumScientificName = ?"; 
    db.get().query(sql,[bacteria],(err,result)=>{
        
    getToxin();
    });
}
