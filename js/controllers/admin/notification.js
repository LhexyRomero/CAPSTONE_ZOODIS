const db = require('../../connection');

exports.notificationCard = (req,res,next) =>{

    let sql = "SELECT DISTINCT assignID FROM request_t";
    let resResult = "";
    db.get().query(sql,(err,result)=>{
        if(err) return next(err);

        for (let index = 0; index < result.length; index++) {
            
            let sql1 = "SELECT * FROM request_t WHERE assignID =?";
            db.get().query(sql1,[result[index].assignID],(err1,result1)=>{
                if(err1) return next(err1);

                console.log(result1);

            });
            
            console.log("here");
            console.log(result[index].assignID);
        }
    });
    res.status(200).send({success:true, detail:"", data:resResult});
}