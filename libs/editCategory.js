"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategory = void 0;
// Edit category system.
// import needed libraries.
const mysql = require("mysql");
function editCategory(what, id, value) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `UPDATE \`community\` SET \`${what}\` = '${value}' WHERE \`id\` = '${id}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
exports.editCategory = editCategory;
//# sourceMappingURL=editCategory.js.map