const mysql = require('mysql');

let dbstate = {
    pool: null,
    mode: null,
}

const zoodis_db = "zoodis";

exports.ZOODIS = 'zoodis_mode';

exports.connect = ((mode, done) => {
    dbstate.pool = mysql.createPool({
        connection: 20,
        host: '127.0.0.1',
        user : 'root',
        password : '',
        database: 'zoodis'
    });

    dbstate.mode = mode;

    dbstate.pool.getConnection((err,con) => {
        if (err) {
            return done(err);
        }

        con.release();
        done(null);
    });
});

exports.get = function(){
    return dbstate.pool;
}