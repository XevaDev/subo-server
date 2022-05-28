import mysql from "mysql";
import { post } from "./types";
type editType = "title" | "text" | "category" | "mediaLink";

// Function to edit a post. Paramaters are editType, post id, and the value to edit.

export function editPost(editType: editType, postId: number, value: string) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `UPDATE posts SET ${editType} = '${value}' WHERE id = '${postId}'`;

  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql, (err, res) => {
      if (err) throw err;
    });
  });

  // set updated_at to now.
  let sql2 = `UPDATE posts SET updated_at = NOW() WHERE id = '${postId}'`;
  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql2, (err, res) => {
      if (err) throw err;
    });
  });
}
