"use strict";
const mysql = require("mysql");
function getCategory(id) {
    let resx;
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `SELECT * FROM category WHERE id = '${id}'`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
            if (res[0]) {
                resx = {
                    id: res[0].id,
                    createdAt: res[0].created_at,
                    css: res[0].css,
                    name: res[0].name,
                    description: res[0].description,
                    icon: res[0].icon,
                    memberCount: res[0].memberCount,
                    ownerId: res[0].ownerId,
                };
            }
        });
    });
    return resx;
}
module.exports = getCategory;
//# sourceMappingURL=getCategory.js.map