"use strict";
// Eechy librairy model to check if the token of a user exists
const mysql = require("mysql");
module.exports = {
    route: "/users/exists",
    run: async (token) => {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                database: "subodb",
            });
            try {
                connection.connect((err) => {
                    if (err)
                        reject(err);
                    let sql = `SELECT * FROM users WHERE token = '${token}'`;
                    connection.query(sql, (err, res) => {
                        if (err)
                            reject(err);
                        if (res[0]) {
                            resolve({ exists: true, message: "User exists" });
                        }
                        else {
                            resolve({ exists: false, message: "User does not exist" });
                        }
                    });
                });
            }
            catch (e) {
                console.log(e);
                resolve({ exists: false, message: "Error while checking user" });
            }
        });
    },
    params: ["token"],
};
//# sourceMappingURL=userExists.js.map