const db = require('../../connection');
const emailer = require('../../emailer');

/* exports.viewMessage = (req, res, next) => {
    let id = req.params.id;
    let member = req.params.member;
    let sql = "SELECT * FROM usermessage_t WHERE usermessageID = ? AND staffID = ?";
    db.get().query(sql, [id, member], (err, result) => {
        if (err) return next(err);
        let dataDisplay = {
            name            :   result[0].name,
            email           :   result[0].email,
            subject         :   result[0].subject,
            message         :   result[0].message,
            date            :   result[0].date,
            time            :   result[0].time
        }
        res.status(200).send({ success: true, detail: "", data: dataDisplay });
    });
} */
exports.messageList = (req, res, next) => {

    let sql = "SELECT * FROM usermessage_t";
    let sql1 = "SELECT * FROM userjournal_t";

    db.get().query(sql,(err,result)=>{
        if(err) return next(err);
        db.get().query(sql1,(err1,result1)=>{
            if(err1) return next(err1);

            dataDisplay = {
                result      :   result,
                result1     :   result1
            }

            console.log(dataDisplay);
            res.status(200).send({success: true, detail:"", data:dataDisplay});
        });

    });
}

exports.send = (req,res,next) =>{
    let data = req.body;
    let message = data.replyMessage;
    let email = data.emailAdd;
    let subject = data.subject;


    emailer(email,{
        subject: 'Re: '+subject,
        body: '<center><div align="center" style="width: 600px; height: 400px; padding: 10px;"><h1 style="color: #9c27b0;"><b>Zoonotic Disease Identification System</b></h1><hr>\n<p style="padding-left:10px;" align="left">Greetings,Researcher!</p>\n<p style="padding:20px; text-align:justify; text-justify:inter-word">' + message + '</p><hr><p><em>Please do not reply to this message. Replies to this message are routed to unmonitored mailbox</em></p></div></center>',
        }, (err,detail) =>{
            if(err) return next(err);
            res.status(200).send({success: true, detail:"Message Sent!"});
        }
    );
}


