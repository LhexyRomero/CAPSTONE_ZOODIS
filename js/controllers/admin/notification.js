const db = require('../../connection');
const emailer = require('../../emailer');

exports.notificationCard = (req,res,next) =>{
    let status = "completed";
    let state = "noticed";

    let sql = "SELECT ownedBy,journal_t.journalID,name,journal_t.code,staffID,middleInitial,firstName,lastName FROM journal_t INNER JOIN staff_t ON journal_t.journalID = staff_t.journalID WHERE journal_t.status =? AND journal_t.state =?";

    db.get().query(sql,[status,state],(err,result)=>{
        if(err) return next(err);

        console.log(result);
        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.notificationDetails = (req,res,next) =>{
    let journalID = req.params.journalID;
    let staffID = req.params.staffID;
    let sql = "SELECT requestID,ownedBy,email,staff_t.staffID,assignID, addedData,category FROM request_t INNER JOIN staff_t ON request_t.staffID = staff_t.staffID INNER JOIN journal_t ON assignID = journal_t.journalID WHERE request_t.staffID = ? AND assignID = ?";
    db.get().query(sql,[staffID,journalID],(err,result)=>{
        if(err) return next(err);
        console.log(result);

        res.status(200).send({success:true, detail:"",data:result});
    });
}

exports.completeUpdate = (req,res,next) =>{
    let id = req.params.id;
    let state = "read";
    let sql = "UPDATE journal_t SET state =? WHERE journalID = ?";

    db.get().query(sql,[state,id],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"Journal Complete!"});
    });
}

exports.sendUpdate = (req,res,next) =>{
    let data = req.body;
    console.log(data);
    let email = data.email;
    let subject = "ZOODIS - Researcher Journal";
    let animal = data.animal;
    let animalTaxon = data.animalTaxon;
    let bacteria = data.bacteria;
    let bacteriaTaxon = data.bacteriaTaxon;

    emailer(email,{
        subject: subject,
        body: '<center><div align="center" style="width: 600px; height: 400px; padding: 10px;"><h1 style="color: #9c27b0;"><b>Zoonotic Disease Identification System</b></h1><hr>\n<p style="padding-left:10px;" align="left">Greetings,Researcher!</p>\n<p style="padding:20px; text-align:justify; text-justify:inter-word">These are the data that we’ve gathered from your journal.</p><table><thead>Gathered Data</thead></table><hr><p><em>Please do not reply to this message. Replies to this message are routed to unmonitored mailbox</em></p></div></center>',
        }, (err,detail) =>{
            if(err) return next(err);
            res.status(200).send({success: true, detail:"Journal Data Sent!"});
        }
    );

}


