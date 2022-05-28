"use strict";
const mysql = require("mysql");
async function getUserByToken(val) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "subodb",
        });
        let sql = `SELECT * FROM users WHERE token = '${val}'`;
        connection.connect((err) => {
            if (err)
                reject(err);
            connection.query(sql, (err, res) => {
                if (err)
                    reject(err);
                let r = res[0];
                if (r)
                    resolve(r);
                else
                    reject("No user found");
            });
        });
    });
}
module.exports = getUserByToken;
//# sourceMappingURL=getUserByToken.js.map