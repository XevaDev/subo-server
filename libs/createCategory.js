"use strict";
// Do like ./createAccount.ts but for categories.
const mysql = require("mysql");
function createCategory(category) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `INSERT INTO \`community\` (\`id\`, \`name\`, \`ownerId\`, \`memberCount\`, \`created_at\`, \`css\`, \`description\`, \`icon\`) VALUES (NULL, '${category.name}', '${category.ownerId}', '0', current_timestamp(), '${category.css || ""}', '${category.description}', '${category.icon}')`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
module.exports = createCategory;
//# sourceMappingURL=createCategory.js.map