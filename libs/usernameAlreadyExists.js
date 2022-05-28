"use strict";
const mysql = require("mysql");
async function usernameAlreadyExists(username) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "subodb",
        });
        connection.connect((err) => {
            if (err)
                reject(err);
            let sql = `SELECT username FROM users WHERE username = '${username}'`;
            connection.query(sql, (err, res) => {
                if (err)
                    reject(err);
                if (res[0] && res[0].username === username) {
                    console.log(res[0]);
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    });
}
module.exports = usernameAlreadyExists;
//# sourceMappingURL=usernameAlreadyExists.js.map