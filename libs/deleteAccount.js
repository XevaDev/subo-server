"use strict";
const mysql = require("mysql");
function deleteAccount(token) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `DELETE FROM users WHERE token = '${token}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
module.exports = deleteAccount;
//# sourceMappingURL=deleteAccount.js.map