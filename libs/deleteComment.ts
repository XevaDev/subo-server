// Function to delete a comment by his id.

import mysql = require("mysql");

export function deleteComment(id: string) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `DELETE FROM comments WHERE id = '${id}'`;

  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql, (err, res) => {
      if (err) throw err;
    });
  });
}
