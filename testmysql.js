var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database:'userdb',
    port: 3306
});
conn.connect();
var selectSQL = 'select * from item';
conn.query(selectSQL, function (err2, rows) {
            if (err2) console.log(err2);

            console.log("SELECT ==> ");
            for (var i in rows) {
                console.log(rows[i]);
            }
        });
