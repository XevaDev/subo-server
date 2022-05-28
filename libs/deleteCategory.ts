// Delete category system.
// Import needed libraries.
import mysql = require("mysql");

export function deleteCategory(id: number) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `DELETE FROM \`community\` WHERE \`id\` = '${id}'`;

  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql, (err, res) => {
      if (err) throw err;
    });
  });
}
