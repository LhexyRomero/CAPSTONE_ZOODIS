const db = require("../../connection");
const emailer = require("../../emailer");

exports.staffList = (req,res,next) =>{

    let admin = 2;
    let contri = 1;
    
    let sql = "SELECT * FROM staff_t WHERE type = ? OR type = ?";

    db.get().query(sql,[admin,contri],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"", data:result});
    });

}


exports.code = (req,res,next) =>{

    let data = req.body;
    let code = data.generate;
    let email = data.emailAdd;
    let type = 3;
    console.log(data);
    console.log(type);
    let sql = "INSERT INTO staff_t (type,code) VALUES (?,?)";
    db.get().query(sql,[type,code],(err,result)=>{
        if(err) return next(err);
        emailer(email,{
            subject: 'Re:',
            body: 'ganda' + code,
            }, (err1,detail) =>{
                if(err1) return next(err1);
                res.status(200).send({success: true, detail:"Key Token Sent!"});
            }
        );
    });
}


exports.updateTypeToAdmin = (req,res,next) =>{

    let id = req.params.id;
    let type = 2;

    let sql = "SELECT * FROM staff_t WHERE staffID = ?";
    let sql1 = "UPDATE staff_t SET type = ? WHERE staffID = ?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[type,id],(err1,result1)=>{
            if(err1) return next(err1);
    
            let firstName = result[0].firstName;
            let lastName = result[0].lastName;
            let name = firstName + " " + lastName;
    
            res.status(200).send({success:true, detail:name+""+" is now Admin!"});
        });
    });
}

exports.updateTypeToContributor = (req,res,next) =>{

    let id = req.params.id;
    let type = 1;

    let sql = "SELECT * FROM staff_t WHERE staffID = ?";
    let sql1 = "UPDATE staff_t SET type = ? WHERE staffID = ?";
    db.get().query(sql,[id],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[type,id],(err1,result1)=>{
            if(err1) return next(err1);
    
            let firstName = result[0].firstName;
            let lastName = result[0].lastName;
            let name = firstName + " " + lastName;
    
            res.status(200).send({success:true, detail:name+""+" is now Contributor!"});
        });
    });
}