"use strict";
const mysql = require("mysql");
function usernameAlreadyExists(username) {
    let resx;
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    connection.connect((err) => {
        if (err)
            throw err;
        let sql = `SELECT username FROM users WHERE username = '${username}'`;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
            if (res[0] && res[0].username === username) {
                resx = true;
            }
            else {
                resx = false;
            }
        });
    });
    return resx;
}
module.exports = usernameAlreadyExists;
//# sourceMappingURL=usernameAlreadyExists.js.map