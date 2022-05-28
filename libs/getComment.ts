// Get comment system.
// Import needed libraries.

import mysql = require("mysql");
import type { comment } from "./types";

// Function to get comment informations by id.
export async function getComment(id: number): Promise<comment> {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      database: "subodb",
    });

    let sql = `SELECT * FROM comments WHERE id = '${id}'`;

    connection.connect((err) => {
      if (err) reject(err);
      connection.query(sql, (err, res) => {
        if (err) reject(err);

        let r = res[0];

        if (r) {
          resolve(res);
        } else {
          reject();
        }
      });
    });
  });
}
