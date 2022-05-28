// Edit category system.
// import needed libraries.
import mysql = require("mysql");
type editType = "name" | "icon" | "description" | "css";

export function editCategory(what: editType, id: number, value: string) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `UPDATE \`community\` SET \`${what}\` = '${value}' WHERE \`id\` = '${id}'`;

  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql, (err, res) => {
      if (err) throw err;
    });
  });
}
