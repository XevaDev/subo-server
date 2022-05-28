import mysql from "mysql";

import type { post } from "./types";

// Async function to get all the posts created by a user thanks to the user id.

export async function listPostsByUser(auhorId: string): Promise<post[]> {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `SELECT * FROM posts WHERE authorId = '${auhorId}'`;

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
