const db = require('../connection');

exports.authenticate = function(req, res, next){
    if(req.session.staffID){
        next();
    }else{
        res.status(401);
        if(req.xhr){
            res.send({success: false, detail: "unathorize"});
        }else{
            res.redirect('/login');
        }
    }
}

exports.login = function(req, res, next){
    let username = req.body.username || "";
    let password = req.body.password || "";

    let sql = "SELECT * FROM staff_t WHERE userName = ? AND password = SHA1(?)";

    db.get().query(sql, [username, password], function(err, result){
        if(err) return next(err);
        if(result.length != 0){
            req.session.staffID = result[0].staffID;
            req.session.accType = result[0].type;
            req.session.staffData = result[0];
            next();
        }else{
            res.redirect('/login?failed=1');
        }
    });
}

exports.logout = function(req, res, next){
    req.session.destroy();
    res.redirect('/login');
}

exports.authRedirect = function(req, res, next){
    if(req.session.accType == 2){
        res.redirect('/dashboard');
    }else if(req.session.accType == 1){
        res.redirect('/contri_Dashboard');
    }else{
        next();
    }
}

exports.register = function(req, res, next){
    let fname = req.body.fname || null;
    let lname = req.body.lname || null;
    let email = req.body.email || null;
    let username = req.body.username || email;
    let password = req.body.password || null;

    let data = [fname, lname, username, email, password, 1];

    data.forEach((e)=>{
        if(e == null) return res.redirect('/register?error=1');
    });

    let sql = "INSERT INTO staff_t VALUES(null,?,?,'',?,?,'','',SHA1(?),?)";

    db.get().query(sql, data, function(err){
        if(err) return next(err);
        res.status(200).redirect('/register?error=2');
    });
}