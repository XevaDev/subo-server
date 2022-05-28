"use strict";
// Eechy librairy model to check if a username already exists:
const mysql = require("mysql");
module.exports = {
    route: "/users/username/exists",
    run: async (username) => {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                database: "subodb",
            });
            let sql = `SELECT username FROM users WHERE username = '${username}'`;
            try {
                connection.connect((err) => {
                    if (err)
                        reject(err);
                    connection.query(sql, (err, res) => {
                        if (err)
                            reject(err);
                        if (res[0]) {
                            resolve({ exists: true, message: "Username exists" });
                        }
                        else {
                            resolve({ exists: false, message: "Username does not exist" });
                        }
                    });
                });
            }
            catch (e) {
                console.log(e);
                resolve({ exists: false, message: "Error while checking username" });
            }
        });
    },
    params: ["username"],
};
//# sourceMappingURL=UsernameAlreadyExists.js.map