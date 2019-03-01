const db = require('../../connection');
const emailer = require('../../emailer');

exports.messageDetail = (req, res, next) => {
    let id = req.query.mid;
    let jID = req.query.ujid;
    let member = req.query.staffid;
    let state = 2;

    if(id){
        let sql ="SELECT * FROM usermessage_t WHERE usermessageID = ?";
        let sql1 ="UPDATE usermessage_t SET mState = ? WHERE usermessageID = ?";
        db.get().query(sql,[id],(err,result)=>{
            if(err) return next(err);
            db.get().query(sql1,[state,id],(err1,result1)=>{
                if(err1) return next(err1);
                res.locals.email= result[0].mEmail;
                res.locals.subject= result[0].mSubject;
                res.locals.message= result[0].mMessage;
                res.locals.date= Date.parse(result[0].mDateTime).toString('MMMM dd, yyyy hh:mm tt'); 
                res.render('admin/messageDetails');
            });
        });
    }
    else if(jID) {
        let sql = "SELECT * FROM staff_t S, userjournal_t U WHERE S.staffID = U.staffID AND userjournalID = ? AND U.staffID = ?";
        let sql1 ="UPDATE userjournal_t SET jState = ? WHERE userjournalID = ?";
        db.get().query(sql, [jID, member], (err, result) => {
            if (err) return next(err);
            db.get().query(sql1, [state,jID],(err1,result1)=>{
                if(err1) return next(err1);
                res.locals.title =result[0].jTitle;
                res.locals.file = result[0].jFile;
                res.locals.email = result[0].email;
                res.locals.subject = result[0].jSubject;
                res.locals.message = result[0].jMessage;
                res.locals.date = Date.parse(result[0].jDateTime).toString('MMMM dd, yyyy hh:mm tt');
                res.render('admin/messageDetails');
            });
        });
    }
    else{
        res.redirect('/message');
    } 
}

exports.messageList = (req, res, next) => {

    let sql = "SELECT * FROM usermessage_t";
    let sql1 = "SELECT * FROM staff_t S, userjournal_t U WHERE S.staffID = U.staffID AND type=3";

    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,(err1,result1)=>{
            if(err1) return next(err1);

            let task1 = new Promise((resolve, reject)=>{
                if(result.length == 0) return resolve();
                result.forEach((element,index) => {
                    result[index].type = 1;
                    if(index == result.length-1){
                        resolve();
                    }
                });
            });
            
            let task2 = new Promise((resolve, reject)=>{
                if(result1.length == 0) return resolve();
                result1.forEach((element,index) => {
                    result1[index].type = 2;
                    if(index == result1.length-1){
                        resolve();
                    }
                });
            });
            
            Promise.all([task1,task2]).then(done=>{
                res.status(200).send({success: true, detail:"", data: result.concat(result1)});
            }).catch(reason=>{
                next(reason);
            });
        });

    });
}

exports.send = (req,res,next) =>{
    let data = req.body;
    let message = data.replyMessage;
    let email = data.emailAdd;
    let subject = data.subject || "(No Subject)";

    emailer(email,{
        subject: 'Re: '+subject,
        body: '<center><div align="center" style="width: 600px; height: 400px; padding: 10px;"><h1 style="color: #9c27b0;"><b>Zoonotic Disease Identification System</b></h1><hr>\n<p style="padding-left:10px;" align="left">Greetings,Researcher!</p>\n<p style="padding:20px; text-align:justify; text-justify:inter-word">' + message + '</p><hr><p><em>Please do not reply to this message. Replies to this message are routed to unmonitored mailbox</em></p></div></center>',
        }, (err,detail) =>{
            if(err) return next(err);
            res.status(200).send({success: true, detail:"Message Sent!"});
        }
    );
}

exports.adminSend = (req,res,next)=>{
    let data = req.body;
    let email = data.email;
    let subject = data.subject || "(No Subject)";
    let message = data.adminMessage;

    emailer(email,{
        subject: 'Re: '+subject,
        body: '<center><div align="center" style="width: 600px; height: 400px; padding: 10px;"><h1 style="color: #9c27b0;"><b>Zoonotic Disease Identification System</b></h1><hr>\n<p style="padding-left:10px;" align="left">Greetings,Researcher!</p>\n<p style="padding:20px; text-align:justify; text-justify:inter-word">' + message + '</p><hr><p><em>Please do not reply to this message. Replies to this message are routed to unmonitored mailbox</em></p></div></center>',
        }, (err,detail) =>{
            if(err) return next(err);
            res.status(200).send({success: true, detail:"Message Sent!"});
        }
    );
}


exports.readMessage = (req,res,next)=>{
    console.log("LEKI");
    let id = req.body.id;
    console.log(id);
}

exports.messageNumber = (req,res,next)=>{
    let state = 1;
    let sql = "SELECT * from usermessage_t WHERE mState =?";
    let sql1 = "SELECT * from userjournal_t WHERE jState =?";

    db.get().query(sql,[state],(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,[state],(err1,result1)=>{
            if(err1) return next(err1);

            let total  = result.length + result1.length;
            console.log(total);
            
            res.status(200).send({success: true, data:total});
        });
    });
}


