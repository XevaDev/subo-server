"use strict";
const mysql = require("mysql");
const passwordhash = require("password-hash");
const tokenGenerator = require("./tokenGenerator");
function createAccount(user) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let hash = passwordhash.generate(user.password);
    let token = tokenGenerator();
    let sql = `INSERT INTO \`users\` (\`id\`, \`username\`, \`email\`, \`password\`, \`token\`, \`avatar\`, \`bio\`, \`created_at\`) VALUES (NULL, '${user.username}', '${user.email}', '${hash}', '${token}', '${user.avatar}', '${user.bio}', current_timestamp())`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
        });
    });
}
module.exports = createAccount;
//# sourceMappingURL=createAccount.js.map