"use strict";
const mysql = require("mysql");
require("path");
async function listCategory() {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "subodb",
        });
        let sql = `SELECT * FROM category`;
        connection.connect((err) => {
            if (err)
                reject(err);
            connection.query(sql, (err, res) => {
                if (err)
                    reject(err);
                resolve(res[0]);
            });
        });
    });
}
module.exports = listCategory;
//# sourceMappingURL=listCategories.js.map