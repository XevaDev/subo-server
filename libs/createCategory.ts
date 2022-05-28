// Do like ./createAccount.ts but for categories.
import mysql = require("mysql");

import type { category } from "./types";

function createCategory(category: category) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let sql = `INSERT INTO \`community\` (\`id\`, \`name\`, \`ownerId\`, \`memberCount\`, \`created_at\`, \`css\`, \`description\`, \`icon\`) VALUES (NULL, '${
    category.name
  }', '${category.ownerId}', '0', current_timestamp(), '${
    category.css || ""
  }', '${category.description}', '${category.icon}')`;

  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql, (err, res) => {
      if (err) throw err;
    });
  });
}

export = createCategory;
