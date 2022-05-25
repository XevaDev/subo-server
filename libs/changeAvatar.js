"use strict";
const mysql = require("mysql");
function changeAvatar(token, avatar) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `UPDATE users SET avatar = '${avatar}' WHERE token = '${token}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
module.exports = changeAvatar;
//# sourceMappingURL=changeAvatar.js.map