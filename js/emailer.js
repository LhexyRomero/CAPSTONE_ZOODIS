const nodemailer = require('nodemailer');
const email = process.env.EMAIL_USER || "zoodissystem@gmail.com";
const pass = process.env.EMAIL_PASS || "zoodisleki02";
const service = process.env.EMAIL_SERVICE || "gmail";
const smtp =  process.env.SMTP_SERVER || "smtp.gmail.com";
const smtp_port = process.env.SMTP_PORT || 465;
const smtp_secure = process.env.SMTP_SECURE || true;

module.exports = (recipient,content,cb) => {

    const mail = {
        from : email,
        to: recipient,
        subject: content.subject,
        html: content.body
    };

    const transporter = nodemailer.createTransport({
        host: smtp,
        port: smtp_port,
        secure: smtp_secure,
        auth:{
            user: email,
            pass: pass,
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    transporter.sendMail(mail,(err,info)=>{
        if(err) return cb(err);
        cb(null,info.response);
    });
    // setTimeout(()=>{
    // },5000);
}