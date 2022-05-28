// Edit comment system.
// Import needed libraries.
import mysql = require("mysql");
import { getComment } from "./getComment";
import getUserByToken = require("./getUser/getUserByToken");

// Function to edit a comment. Parameters are the comment id and the token of the user who want to edit it.
export function editComment(id: number, token: string, newText: string) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let comment = getComment(id);
  if (comment == null) return;

  comment.then((c) => {
    let sql = `UPDATE comments SET content = '${newText}' WHERE id = '${id}'`;

    connection.connect((err) => {
      if (err) throw err;
      connection.query(sql, (err, res) => {
        if (err) throw err;
      });
    });

    // set updated_at to now
    let sql2 = `UPDATE comments SET updated_at = NOW() WHERE id = '${id}'`;
    connection.connect((err) => {
      if (err) throw err;
      connection.query(sql2, (err, res) => {
        if (err) throw err;
      });
    });
  });
}
