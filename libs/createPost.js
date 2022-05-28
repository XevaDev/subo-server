"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
// Import needed libraries.
const mysql = require("mysql");
function createPost(post) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let postText = post.postType === "text" || post.postType === "quote" ? post.text : "";
    let sql = `INSERT INTO posts (authorId, categoryId, title, text, created_at, updated_at, postType, mediaLink) VALUES ('${post.authorId}', '${post.categoryId}', '${post.title}', '${postText}', '${post.created_at}', '${post.updated_at}', '${post.postType}', '${post.mediaLink}')`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
exports.createPost = createPost;
//# sourceMappingURL=createPost.js.map