"use strict";
const mysql = require("mysql");
function editUsername(token, username) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `UPDATE users SET username = '${username}' WHERE token = '${token}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
module.exports = editUsername;
//# sourceMappingURL=editUsername.js.map