import mysql from "mysql";
import type { category } from "./types";

// Async function to list all the categories created by a user thanks to the user id.

export function listCategoriesByUser(authorId: string): Promise<category[]> {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `SELECT * FROM categories WHERE authorId = '${authorId}'`;

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
