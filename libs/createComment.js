"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = void 0;
// Create comment system.
// Import needed libraries.
const mysql = require("mysql");
function createComment(comment) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `INSERT INTO \`comments\` (\`id\`, \`authorId\`, \`postId\`, \`content\`, \`created_at\`, \`updated_at\`, \`repliedto\`) VALUES (NULL, '${comment.authorId}', '${comment.postId}', '${comment.content}', current_timestamp(), current_timestamp(), '${comment.repliedto || ""}')`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
exports.createComment = createComment;
//# sourceMappingURL=createComment.js.map