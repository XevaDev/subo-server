"use strict";
// Function to delete a comment by his id.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = void 0;
const mysql = require("mysql");
function deleteComment(id) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `DELETE FROM comments WHERE id = '${id}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
exports.deleteComment = deleteComment;
//# sourceMappingURL=deleteComment.js.map