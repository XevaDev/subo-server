import mysql from "mysql";
import type { comment } from "./types";

// Async function to get all the comments created by a user thanks to the user id.

export function listCommentsByUser(authorId: string): Promise<comment[]> {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `SELECT * FROM comments WHERE authorId = '${authorId}'`;

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
