"use strict";
const mysql = require("mysql");
async function getUserByEmail(val) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "subodb",
        });
        let sql = `SELECT * FROM users WHERE email = '${val}'`;
        connection.connect((err) => {
            if (err)
                reject(err);
            connection.query(sql, (err, res) => {
                if (err)
                    reject(err);
                let r = res[0];
                resolve(r);
            });
        });
    });
}
module.exports = getUserByEmail;
//# sourceMappingURL=getUserByEmail.js.map