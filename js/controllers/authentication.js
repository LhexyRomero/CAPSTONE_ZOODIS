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
    req.session.destroy();
    res.redirect('/login');
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

        db.get().query(sql, [fname, lname, username, email, password, type, journal, code], function (err) {
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

    let data = [firstName, lastName, middleInitial, userName, email, password];

    data.forEach((e, i) => {
        if (e == null || e  == undefined) {
            res.redirect('/registerResearcher?error=1');
        }

        if (i == data.length - 1) {
            let sql = "INSERT INTO user_t (firstName,lastName,mi,userName,email,password) VALUES (?,?,?,?,?,?)";

            db.get().query(sql, [firstName, lastName, middleInitial, userName, email, password], (err, result) => {
                if (err) return next(err);
                res.status(200).redirect('/registerResearcher?error=2');
            });

        }

    });
}