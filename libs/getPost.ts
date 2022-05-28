import mysql from "mysql";

import type { post } from "./types";
// Async function to get the informations of the post thanks to his id.
export async function getPost(postId: number): Promise<post> {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `SELECT * FROM posts WHERE id = '${postId}'`;

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) reject(err);
      connection.query(sql, (err, res) => {
        if (err) reject(err);
        resolve(res[0]);
      });
    });
  });
}
