// Import needed libraries.
import mysql = require("mysql");

import type { post } from "./types";
export function createPost(post: post) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let postText =
    post.postType === "text" || post.postType === "quote" ? post.text : "";

  let sql = `INSERT INTO posts (authorId, categoryId, title, text, created_at, updated_at, postType, mediaLink) VALUES ('${post.authorId}', '${post.categoryId}', '${post.title}', '${postText}', '${post.created_at}', '${post.updated_at}', '${post.postType}', '${post.mediaLink}')`;

  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql, (err, res) => {
      if (err) throw err;
    });
  });
}
