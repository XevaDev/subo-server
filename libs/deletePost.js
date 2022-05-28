"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = void 0;
const mysql_1 = __importDefault(require("mysql"));
// Delete post by id.
function deletePost(postId) {
    var connection = mysql_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `DELETE FROM posts WHERE id = '${postId}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=deletePost.js.map