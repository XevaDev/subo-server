// Login system. If you have the email and the password, you can have the token to connect every where.

import mysql = require("mysql");

export = {
  route: "/users/login",
  run: async (email: string, pw: string) => {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
      });

      let sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${pw}'`;

      try {
        connection.connect((err) => {
          if (err) reject(err);
          connection.query(sql, (err, res) => {
            if (err) reject(err);
            if (res[0]) {
              resolve({
                message: "Login success. Redirecting.",
                error: false,
                token: res[0].token,
              });
            } else {
              resolve({
                message: "Login failed. Wrong email or password.",
                error: true,
              });
            }
          });
        });
      } catch (e) {
        console.log(e);
        resolve({ message: "Error while logging in.", error: true });
      }
    });
  },
  params: ["email", "pw"],
};
