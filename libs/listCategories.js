"use strict";
const mysql = require("mysql");
function listCategory() {
    let resx;
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `SELECT * FROM category`;
    connection.connect((err) => {
        if (err)
            throw err;
        connection.query(sql, (err, res) => {
            if (err)
                throw err;
            for (let i = 1; i <= res.length; i++) {
                if (resx instanceof Array) {
                    resx.push({
                        id: res[i].id,
                        createdAt: res[i].created_at,
                        css: res[i].css,
                        name: res[i].name,
                        description: res[i].description,
                        icon: res[i].icon,
                        memberCount: res[i].memberCount,
                        ownerId: res[i].ownerId,
                    });
                }
                else {
                    resx = [
                        {
                            id: res[i].id,
                            createdAt: res[i].created_at,
                            css: res[i].css,
                            name: res[i].name,
                            description: res[i].description,
                            icon: res[i].icon,
                            memberCount: res[i].memberCount,
                            ownerId: res[i].ownerId,
                        },
                    ];
                }
            }
        });
    });
    return resx;
}
module.exports = listCategory;
//# sourceMappingURL=listCategories.js.map