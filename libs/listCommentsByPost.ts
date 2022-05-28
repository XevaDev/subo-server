import mysql from "mysql";
import type { comment } from "./types";

// Async function to get all the comments in a post thanks to the post id.

export async function listCommentsByPost(postId: number): Promise<comment[]> {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `SELECT * FROM comments WHERE postId = '${postId}'`;

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) reject(err);
      connection.query(sql, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  });
}
