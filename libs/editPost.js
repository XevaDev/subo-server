"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPost = void 0;
const mysql_1 = __importDefault(require("mysql"));
require("./types");
// Function to edit a post. Paramaters are editType, post id, and the value to edit.
function editPost(editType, postId, value) {
    var connection = mysql_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `UPDATE posts SET ${editType} = '${value}' WHERE id = '${postId}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
    // set updated_at to now.
    let sql2 = `UPDATE posts SET updated_at = NOW() WHERE id = '${postId}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql2, (err, res) => {
            if (err)
                throw err;
        });
    });
}
exports.editPost = editPost;
//# sourceMappingURL=editPost.js.map