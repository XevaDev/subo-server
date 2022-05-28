// Eechy librairy model:

import mysql = require("mysql");

export = {
  route: "/exists/email",
  run: async (email: string) => {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
      });

      try {
        connection.connect((err) => {
          if (err) reject(err);
          let sql = `SELECT email FROM users WHERE email = '${email}'`;

          connection.query(sql, (err, res) => {
            if (err) reject(err);
            if (res[0] && res[0].email === email) {
              resolve({ error: false, exists: true, message: "Email exists" });
            } else {
              resolve({
                error: false,
                exists: false,
                message: "Email does not exist",
              });
            }
          });
        });
      } catch (e) {
        console.log(e);
        resolve({
          error: true,
          exists: false,
          message: "Error while checking email",
        });
      }
    });
  },
  params: ["email"],
};
