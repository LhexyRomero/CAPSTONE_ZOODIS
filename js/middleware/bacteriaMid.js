const db = require("../connection");

exports.addBacteriaTaxon = (req,res,next) =>{
    let data = req.body;

    let strPhylum = data.strPhylum;
    let strClass = data.strClass;
    let strOrder = data.strOrder;
    let strFamily = data.strFamily;
    let strGenus = data.strGenus;
    let strSpecies = data.strSpecies;

    let insertBacteriaTaxon = function() {
        let sql = "INSERT INTO bacteriataxo_t (phylum, class, orderr, family, genus, species) VALUES (?,?,?,?,?,?)";
        db.get().query(sql,[strPhylum,strClass,strOrder,strFamily,strGenus,strSpecies],(err,result)=>{
            if(err) return next(err);

            res.status(200).send({success:true, detail: "Successfuly Added!", data: result});
        });
    }

    let checkBacteriaTaxon = function(cb) {
        let sql1 = "SELECT * FROM bacteriataxo_t WHERE species =?";
        db.get().query(sql1,[strSpecies],(err1,result1)=>{
            if(err1) return cb(err1);

            
            if(result1.length == 0){
                return cb(null,true);
            }
            else { 
                return cb(null,false);
            }
        });
    }

    checkBacteriaTaxon((error,result)=>{ 
        if (error) return next(error);

            if(result) {    
                insertBacteriaTaxon();
            }
            
            else {
                res.status(200).send({success: false, detail: "Data Already Exists"})
            }
    }); 

    
}

exports.bacteriaTaxonList = (req,res,next) =>{

    let sql2 = "SELECT * FROM bacteriataxo_t";
    db.get().query(sql2, (err2,result2)=>{
        if(err2) return next(err2);

        res.status(200).send({success:true, detail: "", data: result2});
    });

}

exports.editBacteriaTaxon = (req,res,next) =>{

    let id = req.params.id;

    let sql3 = "SELECT * FROM bacteriataxo_t WHERE bacteriumTaxoID = ?";
    db.get().query(sql3,[id],(err3,result3)=>{
        if(err3) return next(err3);

        let dataDisplay = {
            id              :result3[0].bacteriumTaxoID,
            phylum          : result3[0].phylum,
            class           : result3[0].class,
            order           : result3[0].orderr,
            family          : result3[0].family,
            genus           : result3[0].genus,
            species         : result3[0].species,
        };

        res.status(200).send({success:true, detail:"", data:dataDisplay});
    });


}

exports.updateBacteriaTaxon = (req,res,next) =>{

    console.log("DITO AKOOOOOOOO");
    let id = req.params.id;
    let data = req.body;

    let strPhylum = data.modalPhylum;
    let strClass = data.modalClass;
    let strOrder = data.modalOrder;
    let strFamily = data.modalFamily;
    let strGenus = data.modalGenus;
    let strSpecies = data.modalSpecies;

    let sql4 = "UPDATE bacteriataxo_t SET phylum = ?, class =?, orderr = ?, family =?,genus=?, species=? WHERE bacteriumTaxoID = ?";
    db.get().query(sql4,[strPhylum, strClass, strOrder,strFamily,strGenus,strSpecies,id],(err4, result4)=>{
        if(err4) return next(err4);

        res.status(200).send({success:true, detail:"Successfully Updated"});
    });
}