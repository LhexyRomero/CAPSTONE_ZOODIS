const db = require('../../connection');

exports.notificationCard = (req,res,next) =>{

    let sql = "SELECT DISTINCT assignID FROM request_t";
    let resResult = "";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        let promises = [];
        data.forEach((element,index) => {
            promises.push(new Promise((resolve,reject)=>{
                let sql1 = "SELECT * FROM request_t WHERE assignID =?";
                db.get().query(sql1,[result[index].assignID],(err1,result1)=>{
                if(err1) return reject(err1);

                resolve(result1);
                //console.log(result1);
                });
            }));
            if(index == result1.length-1){
                Promise.all(promises).then((result)=>{
                    res.status(200).send({success:true, detail:"", data:result});
                });
            }
        });
    });
}




//


