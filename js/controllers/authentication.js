const db = require('../connection');

exports.authenticate = function (req, res, next) {
    if (req.session.staffID) {
        next();
    } 
    
    else {
        res.status(401);
        if (req.xhr) {
            res.send({ success: false, detail: "unathorize" });
        } else {
            res.redirect('/login');
        }
    }
}

exports.login = function (req, res, next) {
    let username = req.body.username || "";
    let password = req.body.password || "";

    let sql = "SELECT * FROM staff_t WHERE userName = ? AND password = SHA1(?)";

    db.get().query(sql, [username, password], function (err, result) {
        if (err) return next(err);
        if (result.length != 0) {
            req.session.staffID = result[0].staffID;
            req.session.accType = result[0].type;
            req.session.staffData = result[0];
            next();
        } else {
            res.redirect('/login?failed=1');
        }
    });
}

exports.logout = function (req, res, next) {
    req.session.destroy();
    res.redirect('/login');
}

exports.authRedirect = function (req, res, next) {
    if (req.session.accType == 2) {
        res.redirect('/dashboard');
    } else if (req.session.accType == 1) {
        res.redirect('/contri_Dashboard');
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

    let data = [fname, lname, username, email, password, 1,code];
    console.log(data);

    data.forEach((e) => {
        if (e == null) return res.redirect('/register?error=1');
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
        let sql = "UPDATE staff_t SET firstName = ?, lastName = ?, userName = ?, email = ?, password = SHA(?), type = ? ,journalID = ? WHERE code = ?";

        db.get().query(sql,[fname,lname,username,email,password,type,journal,code], function (err) {
            if (err) return next(err);
            res.status(200).redirect('/register?error=2');
        });
    }

    checkCode((error,result)=>{
        if(error) return next(error);

        if(result) {
            insertStaff();
        }
        else{
            res.status(200).redirect('/register?error=3');
        }
    })
}