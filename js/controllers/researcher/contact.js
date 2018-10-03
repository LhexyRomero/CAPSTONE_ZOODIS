const db = require('../../connection');

exports.collabMessage = (req,res,next) =>{

    let data = req.body;
    let subject = data.subject || "(No Subject)";
    let message = data.message;
    let state = 1;

    let sql1 = "SELECT * FROM staff_t WHERE staffID = ?";
    let sql = "INSERT INTO usermessage_t (name,email,subject,message,state,staffID,dateTime) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP)";
    db.get().query(sql1,[req.session.staffID],(err1,result1)=>{
        if(err1) return next(err1);

        let name = result1[0].firstName + " " + result1[0].lastName;
        let email = result1[0].email;

        db.get().query(sql,[name,email,subject,message,state,req.session.staffID],(err,result)=>{
            if(err) return next(err);
    
            res.status(200).send({success: true, detail:"Message Sent!"});
        });
    });
}

exports.contactMessage = (req,res,next) =>{
    let data = req.body;
    let name = data.name;
    let email = data.email;
    let message = data.message;
    let subject = data.subject;
    let state = 1;
    let staffID = 14;

    let sql = "INSERT INTO usermessage_t (name,email,subject,message,state,staffID,dateTime) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP)";
    db.get().query(sql,[name,email,subject,message,state,staffID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success: true, detail:"Message Sent!"});
    });
}