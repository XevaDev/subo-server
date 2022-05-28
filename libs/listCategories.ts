import mysql = require("mysql");
import { resolve } from "path";
type category = {
  id: number;
  name: string;
  memberCount: number;
  ownerId: number;
  created_at: string;
  css?: string;
  description: string;
  icon: string;
};

async function listCategory(): Promise<category[]> {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      database: "subodb",
    });

    let sql = `SELECT * FROM category`;

    connection.connect((err) => {
      if (err) reject(err);
      connection.query(sql, (err, res) => {
        if (err) reject(err);

        resolve(res[0]);
      });
    });
  });
}

export = listCategory;
