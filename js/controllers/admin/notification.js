const db = require('../../connection');
const emailer = require('../../emailer');

exports.notificationCard = (req,res,next) =>{
    let status = "completed";
    let state = "noticed";

    let sql = "SELECT ownedBy,journal_t.journalID,name,journal_t.code,staffID,middleInitial,firstName,lastName FROM journal_t INNER JOIN staff_t ON journal_t.journalID = staff_t.journalID WHERE journal_t.status =? AND journal_t.state =?";

    db.get().query(sql,[status,state],(err,result)=>{
        if(err) return next(err);
        res.status(200).send({success:true, detail:"", data:result});
    });
}

exports.notificationDetails = (req,res,next) =>{
    let journalID = req.params.journalID;
    let staffID = req.params.staffID;
    let sql = "SELECT requestID,ownedBy,email,staff_t.staffID,assignID, addedData,category FROM request_t INNER JOIN staff_t ON request_t.staffID = staff_t.staffID INNER JOIN journal_t ON assignID = journal_t.journalID WHERE request_t.staffID = ? AND assignID = ?";
    db.get().query(sql,[staffID,journalID],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"",data:result});
    });
}

exports.completeUpdate = (req,res,next) =>{
    let id = req.params.id;
    let state = "read";
    let staff = req.params.staff;
    let journalID = 10;
    let sql = "UPDATE journal_t SET state =? WHERE journalID = ?";
    let sql1 = "UPDATE staff_t SET journalID = ? WHERE staffID = ?";

    db.get().query(sql,[state,id],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[journalID,staff],(err1,result1)=>{
            if(err1) return next(err1);

            res.status(200).send({success:true, detail:"Journal Complete!"});
        });
    });
}

exports.incompleteUpdate = (req,res,next)=>{
    let id = req.params.id;
    let data = req.body.name;
    console.log(data);
    let state = "revised";
    let status = "Incomplete";
    let sql = "UPDATE journal_t SET message = ?, status = ?, state =? WHERE journalID =?";


    db.get().query(sql,[data,status,state,id],(err,result)=>{
        if(err) return next(err);

        res.status(200).send({success:true, detail:"Mark as Incomplete!"});
    });
}

exports.sendUpdate = (req,res,next) =>{

    let id = req.params.id;
    let data = req.body;
    let owner = req.params.owner;
    console.log(data);
    let state = "read";
    let subject = "ZOODIS - Researcher Journal";
    let animal = data.animal;
    let animalTaxon = data.animalTaxon;
    let bacteria = data.bacteria;
    let bacteriaTaxon = data.bacteriaTaxon;
    let sql = "UPDATE journal_t SET state =? WHERE journalID = ?";
    let sql1 = "SELECT email FROM staff_t WHERE staffID = ?";

    
    db.get().query(sql1,[owner],(err1,result1)=>{
        if(err1) return next(err1);

        emailer(result1[0].email,{
            subject: subject,
            body: '<center><div align="center" style="width: 600px; height: 500px; padding: 10px;"><h1 style="color: #9c27b0;"><b>Zoonotic Disease Identification System</b></h1><hr>\n<p style="padding-left:10px;" align="left">Greetings,Researcher!</p>\n<p style="padding:20px; text-align:justify; text-justify:inter-word">These are the data that we’ve gathered from your journal.</p><table><tr><th>Category</th><th>Data</th></tr><tbody><tr><td>Animal Taxonomy</td><td>'+animalTaxon+'</td></tr><tr><td>Bacteria Taxonomy</td><td>'+bacteriaTaxon+'</td></tr><tr><td>Animal</td><td>'+animal+'</td></tr><tr><td>Bacteria</td><td>'+bacteria+'</td></tr></tbody></table>\n<p style="padding:20px; text-align:justify; text-justify:inter-word">To know more information about the newly gathered data, vist our website at Zoodis.com</p><hr><p><em>Please do not reply to this message. Replies to this message are routed to unmonitored mailbox</em></p></div></center>',
            }, (err,detail) =>{
                if(err) return next(err);
                db.get().query(sql,[state,id],(err1,result)=>{
                    if(err1) return next(err1);
    
                    res.status(200).send({success: true, detail:"Journal Data Sent!"});
                });
            }
        );
    
    })

}


