const db = require('../connection');
const emailer = require('../emailer');

var pendingRegistration = [];

exports.authenticate = function (req, res, next) {
    if (req.session.staffID) {
        next();
    }

    else {
        res.status(401);
        if (req.xhr) {
            res.send({ success: false, detail: "unathorize" });
        } else {
            res.redirect('/');
        }
    }
}

exports.login = function (req, res, next) {
    let username = req.body.username || "";
    let password = req.body.password || "";
    let type = req.body.type || false;

    let sql = "SELECT * FROM staff_t WHERE userName = ? AND password = SHA1(?)";

    db.get().query(sql, [username, password], function (err, result) {
        if (err) return next(err);
        if (result.length != 0) {
            if (type) {
                if (type == result[0].type) {
                    req.session.staffID = result[0].staffID;
                    req.session.accType = result[0].type;
                    req.session.staffData = result[0];
                } else {
                    fail();
                }
            } else {
                req.session.staffID = result[0].staffID;
                req.session.accType = result[0].type;
                req.session.staffData = result[0];
            }
            next();
        } else {
            fail();
        }

        function fail() {
            if (req.xhr) {
                return res.status(200).send({ success: false, detail: "Invalid Username/Password" });
            }
            res.redirect('/login?failed=1');
        }
    });
}

exports.logout = function (req, res, next) {
    if(req.session.accType == 1 || req.session.accType == 2){
        req.session.destroy();
        res.redirect('/login');
    }
    else {
        req.session.destroy();
        res.redirect('/');
    }
}

exports.authRedirect = function (req, res, next) {
    if (req.xhr) {
        return res.status(200).send({ success: true });
    }
    if (req.session.accType == 2) {
        res.redirect('/dashboard');
    } else if (req.session.accType == 1) {
        res.redirect('/contri_Dashboard');
    } else if (req.session.accType == 3) {
        res.redirect('/collab');
    } else {
        next();
    }
}

exports.register = function (req, res, next) {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let username = req.body.username || email;
    let password = req.body.password;
    let code = req.body.code;
    let type = 1;
    let journal = 10;
    let exists = 'yes';

    let data = [fname,lname,email,username,password,code,type,journal];

   /*  data.forEach((e) => {
        console.log(data);  
        if (e.fname == '' || e.lname == '' || e.email == '' || e.username == '' || e.password == '' || e.code == '') {
            return res.redirect('/register?error=1');
            console.log("you bitch");
        }
    }); */

    data.forEach((e)=>{
        if(e = null){
            return res.redirect('/register?error=1');
        }
    });

    let checkCode = (cb) => {
        let sql = "SELECT * FROM staff_t WHERE code = ?";
        db.get().query(sql, [code], (err, result) => {
            if (err) return cb(err);

            if (result.length == 0) {
                return cb(null, false)
            }
            else {
                return cb(null, true);
            }
        });
    }

    let insertStaff = () => {
        let sql = "UPDATE staff_t SET code=?, firstName = ?, lastName = ?, userName = ?, email = ?, password = SHA(?), type = ? ,journalID = ? WHERE code = ?";

        db.get().query(sql, [exists,fname, lname, username, email, password, type, journal, code], function (err) {
            if (err) return next(err);
            res.status(200).redirect('/register?error=2');
        });
    }

    checkCode((error, result) => {
        if (error) return next(error);
        if (result) {
            insertStaff();
        }
        else {
            res.status(200).redirect('/register?error=3');
        }
    }) 
}

exports.researcherRegister = (req, res, next) => {

    let firstName = req.body.firstName;
    let middleInitial = req.body.middleInitial;
    let lastName = req.body.lastName;
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;
    let status = 2;
    let type = 3;

    let data = [firstName, lastName, middleInitial, userName, email, password];

    data.forEach((e, i) => {
        if (e == null || e  == undefined || e == '') {
            return res.redirect('/registerResearcher?error=1');
        }
        if (i == data.length - 1) {
            let sql = "INSERT INTO staff_t (firstName,lastName,middleInitial,userName,email,password,status,type) VALUES (?,?,?,?,?,SHA(?),?,?)";
            db.get().query(sql, [firstName, lastName, middleInitial, userName, email, password,status,type], (err, result) => {
                if (err) return next(err);
                res.status(200).redirect('/registerResearcher?error=2');
                let code = Math.random().toString(36).replace('0.','');
                emailer(email, {
                    subject: 'Email Verification Researcher!',
                    body: '<center><div align="center" style="width: 600px; height: 400px; padding: 10px;"><h1 style="color: #9c27b0;"><b>Zoodis Account Verification</b></h1><hr>\n<p style="padding-left:10px;" align="left">Welcome, Researcher!</p><p style="padding:20px; text-align:justify; text-justify:inter-word">ZOODIS will require you to verify your account setup. The verification code given will be needed in order to finalize setting up you account.Your <b>VERIFICATION CODE</b> is:</p><h1><b><u>' + code + '</u><b></h1></div></center>',
                }, function(err, detail){
                    if(err) return next(err);
                    pendingRegistration.push({
                        id: result.insertId,
                        code: code
                    });
                    setTimeout(()=>{
                        var id = result.insertId;
                        var index = pendingRegistration.findIndex(x=>x.id == id);
                        pendingRegistration.splice(index,1);
                    },3600000);
                });
            });
        }
    });
}

exports.researcherConfirm = (req, res, next) => {
    let code = req.body.code;
    let index = pendingRegistration.findIndex(x=>x.code == code);
    if(index != -1){
        let id = pendingRegistration[index].id;
        let sql = "UPDATE staff_t SET status = 1 WHERE staffID = ?";
        db.get().query(sql, [id], function(err){
            if(err) return next(err);
            res.status(200).send({success: true});
        });
    }else{
        res.status(200).send({success: false, detail: 'Invalid Verification Code'});
    }
}
