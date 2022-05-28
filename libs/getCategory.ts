import mysql = require("mysql");
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

async function getCategory(id: string): Promise<category> {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      database: "subodb",
    });

    let sql = `SELECT * FROM category WHERE id = '${id}'`;

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

export = getCategory;
