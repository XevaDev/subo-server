"use strict";
// Eechy librairy model to get public user information by his id:
const mysql = require("mysql");
module.exports = {
    route: "/users/public/get",
    run: async (id) => {
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
                    let sql = `SELECT id, username, avatar, bio, created_at, verified FROM users WHERE id = '${id}'`;
                    connection.query(sql, (err, res) => {
                        if (err)
                            reject(err);
                        if (res[0]) {
                            resolve({ error: false, message: "User found", data: res[0] });
                        }
                        else {
                            resolve({ error: true, message: "User not found" });
                        }
                    });
                });
            }
            catch (e) {
                console.log(e);
                resolve({ error: true, message: "Error while getting user" });
            }
        });
    },
    params: ["id"],
};
//# sourceMappingURL=getPublicUser.js.map