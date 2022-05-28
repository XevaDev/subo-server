"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
// Delete category system.
// Import needed libraries.
const mysql = require("mysql");
function deleteCategory(id) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `DELETE FROM \`community\` WHERE \`id\` = '${id}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=deleteCategory.js.map