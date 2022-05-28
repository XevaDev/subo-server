"use strict";
// Eechy librairy model to get private user informations by his token:
const mysql = require("mysql");
module.exports = {
    route: "/users/private/get",
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
                            resolve({ message: "User found", error: false, data: res[0] });
                        }
                        else {
                            resolve({
                                message: "User not found",
                                error: true,
                                data: undefined,
                            });
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
    params: ["token"],
};
//# sourceMappingURL=getPrivateUser.js.map