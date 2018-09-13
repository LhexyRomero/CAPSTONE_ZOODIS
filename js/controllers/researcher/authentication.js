const db = require('../../connection');

exports.authenticate = function (req,res,next) {
    if (req.session.userID) {
        next();
    }

    else {
        res.status(401);
        if(req.xhr) {
            res.send({success: false, detail:"unauthorize"});
        }
        else {
            res.redirect('/index');
        }
    }
}

exports.login = function (req,res,next) { 
    let username = req.body.userName || "";
    let password = req.body.password || "";

    let sql = "SELECT * FROM user_t WHERE userName = ? AND password = SHA1(?)";
    db.get().query(sql,[username,password], (err,result)=>{
        if(err) return next(err);
        if(result.length !=0){
            req.session.userID = result[0].userID;
            req.session.userData = result[0];
            next();
        }

        else{
            res.redirect('/login?failed=1');
        }
    });
}

exports.logout = function (req,res,next) {
    req.session.destroy();
    res.redirect('/index');
} 

exports.authRedirect = (req,res,next) =>{
    res.redirect('/collab');
    next();
}

exports.register = (req,res,next) =>{

    let firstName = req.body.firstName;
    let middleInitial = req.body.middleInitial;
    let lastName = req.body.lastName;
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;
    let rePassword = req.body.rePassword;

    data.forEach((e) =>{
        if(e == null) return res.redirect('/register?error=1');
    });

    if(password.match(rePassword) == null){
        let sql = "INSERT INTO user_t (firstName,lastName,mi,userName,email,password) VALUES (?,?,?,?,?,?)";

        db.get().query(sql,[firstName,lastName,middleInitial,userName,email,password],(err,result)=>{
            if(err) return next(err);
            res.status(200).redirect('/register?error=3');
        });
    }
    else {
        return res.redirect('/register?error=2');
    }

}