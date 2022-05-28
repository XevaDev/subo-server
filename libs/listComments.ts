import mysql from "mysql";

import type { comment } from "./types";

// Async function to list all comments of a post thanks to post id.

export async function listComments(postId: number): Promise<comment[]> {
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
