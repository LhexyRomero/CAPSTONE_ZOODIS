const db = require('../../connection');

exports.addedData = (req,res,next)=>{
    let sql = "SELECT COUNT(requestID) AS approvedData FROM request_t WHERE status ='approved' AND staffID = ?";
    let sql1 = "SELECT COUNT(requestID) AS rejectData FROM request_t WHERE status ='rejected' AND staffID = ?";

    db.get().query(sql,[req.session.staffID],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[req.session.staffID],(err1,result1)=>{
            if(err1) return next(err1);

            let dataDisplay = {
                approve        :    result[0].approvedData,
                reject         :    result1[0].rejectData
            }

            console.log(dataDisplay);

            res.status(200).send({success:true, detail:"",data:dataDisplay});
        });
    });
}