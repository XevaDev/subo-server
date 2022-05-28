import mysql = require("mysql");

async function emailAlreadyExists(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      database: "subodb",
    });

    connection.connect((err) => {
      if (err) reject(err);
      let sql = `SELECT email FROM users WHERE email = '${email}'`;

      connection.query(sql, (err, res) => {
        if (err) reject(err);
        if (res[0] && res[0].email === email) {
          console.log(res[0]);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  });
}

export = emailAlreadyExists;
