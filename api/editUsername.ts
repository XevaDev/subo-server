import mysql = require("mysql");

// Username length limitations

let usernameMinLength = 3;
let usernameMaxLength = 35;

export = {
  route: "/users/changeUsername",
  run: async (token: string, username: string) => {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
      });

      if (
        username.length < usernameMinLength ||
        username.length > usernameMaxLength
      ) {
        resolve({
          message:
            "Username length must be between " +
            usernameMinLength +
            " and " +
            usernameMaxLength,
          error: true,
        });
      } else {
        let sql = `UPDATE users SET username = '${username}' WHERE token = '${token}'`;

        try {
          connection.connect((err) => {
            if (err) reject(err);
            connection.query(sql, (err, res) => {
              if (err) reject(err);
              resolve({ message: "Username changed", error: false });
            });
          });
        } catch (e) {
          console.log(e);
          resolve({ message: "Error while changing username", error: true });
        }
      }
    });
  },
  params: ["token", "username"],
};
