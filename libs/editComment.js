"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = void 0;
// Edit comment system.
// Import needed libraries.
const mysql = require("mysql");
const getComment_1 = require("./getComment");
// Function to edit a comment. Parameters are the comment id and the token of the user who want to edit it.
function editComment(id, token, newText) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let comment = (0, getComment_1.getComment)(id);
    if (comment == null)
        return;
    comment.then((c) => {
        let sql = `UPDATE comments SET content = '${newText}' WHERE id = '${id}'`;
        connection.connect((err) => {
            if (err)
                throw err;
            connection.query(sql, (err, res) => {
                if (err)
                    throw err;
            });
        });
        // set updated_at to now
        let sql2 = `UPDATE comments SET updated_at = NOW() WHERE id = '${id}'`;
        connection.connect((err) => {
            if (err)
                throw err;
            connection.query(sql2, (err, res) => {
                if (err)
                    throw err;
            });
        });
    });
}
exports.editComment = editComment;
//# sourceMappingURL=editComment.js.map