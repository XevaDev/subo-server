"use strict";
const mysql = require("mysql");
async function getCategory(id) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "subodb",
        });
        let sql = `SELECT * FROM category WHERE id = '${id}'`;
        connection.connect((err) => {
            if (err)
                reject(err);
            connection.query(sql, (err, res) => {
                if (err)
                    reject(err);
                let r = res[0];
                if (r) {
                    resolve(res);
                }
                else {
                    reject();
                }
            });
        });
    });
}
module.exports = getCategory;
//# sourceMappingURL=getCategory.js.map