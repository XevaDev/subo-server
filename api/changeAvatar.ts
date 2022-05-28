// Eechy librairy model to change user avatar:

import mysql = require("mysql");

export = {
  route: "/users/changeAvatar",

  run: async (token: string, avatar: string) => {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
      });

      let sql = `UPDATE users SET avatar = '${avatar}' WHERE token = '${token}'`;

      try {
        connection.connect((err) => {
          if (err) reject(err);
          connection.query(sql, (err, res) => {
            if (err) reject(err);
            resolve({ message: "Avatar changed", error: false });
          });
        });
      } catch (e) {
        console.log(e);
        resolve({ message: "Error while changing avatar", error: true });
      }
    });
  },
  params: ["token", "avatar"],
};
