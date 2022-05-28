"use strict";
// Eechy librairy model to add a new user in the database. Default token is generated.
// Also hash password with the library passwordhash.
// Default parameters are username, email, password and avatar.
// Then return the token of the user.
const mysql = require("mysql");
const passwordhash = require("password-hash");
function generateToken() {
    let length = 32;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
        token += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return token;
}
module.exports = {
    route: "/users/register",
    run: async (username, avatar, email, pw, repeatpw) => {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                database: "subodb",
            });
            // After all, verify if the password and the repeat password are the same.
            // Then verify if the email and the username are not already used.
            // Verify also if the password have at least 8 characters.
            if (!(pw.length < 8)) {
                if (pw === repeatpw) {
                    let sql2 = `SELECT * FROM users WHERE email = '${email}' OR username = '${username}'`;
                    connection.query(sql2, (err, res) => {
                        if (err)
                            reject(err);
                        if (res[0]) {
                            resolve({
                                exists: true,
                                error: false,
                                message: "Email or username already used",
                            });
                        }
                        else {
                            let sql = `INSERT INTO \`users\` (\`id\`, \`username\`, \`email\`, \`password\`, \`token\`, \`avatar\`, \`bio\`, \`created_at\`) VALUES (NULL, '${username}', '${email}', '${passwordhash.generate(pw)}', '${generateToken()}', '${avatar}', '', CURRENT_TIMESTAMP)`;
                            try {
                                connection.connect((err) => {
                                    if (err)
                                        reject(err);
                                    connection.query(sql, (err, res) => {
                                        if (err)
                                            reject(err);
                                        resolve({
                                            error: false,
                                            exists: false,
                                            message: "User added",
                                        });
                                    });
                                });
                            }
                            catch (e) {
                                console.log(e);
                                resolve({ error: true, message: "Error while adding user" });
                            }
                        }
                    });
                }
                else {
                    resolve({
                        error: true,
                        message: "Password and repeat password are not the same",
                    });
                }
            }
            else {
                resolve({
                    error: true,
                    message: "Password must have at least 8 characters",
                });
            }
        });
    },
    params: ["username", "avatar", "email", "pw", "repeatpw"],
};
//# sourceMappingURL=registerUser.js.map