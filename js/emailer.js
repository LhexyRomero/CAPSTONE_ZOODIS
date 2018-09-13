const email = process.env.EMAIL_USER || "zoodissystem@gmail.com";
const pass = process.env.EMAIL_PASS || "zoodisleki02";
const service = process.env.EMAIL_SERVICE || "gmail";
const smtp =  process.env.SMTP_SERVER || "smtp.gmail.com";
const smtp_port = process.env.SMTP_PORT || 465;
const smtp_secure = process.env.SMTP_SECURE || true;

module.exports = (recipient,content,cb) => {

    const email = {
        from : email,
        to: recipient,
        subject: content.subject,
        html: content.body
    };

    const transporter = mail.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transporter.sendEmail(mail,(err,info)=>{
        if(err) return cb(err);
        cb(null,info.response);

    });
}