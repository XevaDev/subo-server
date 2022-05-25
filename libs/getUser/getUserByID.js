"use strict";
const mysql = require("mysql");
async function getUserByID(val) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "subodb",
        });
        let sql = `SELECT id, username, avatar, bio, created_at FROM users WHERE id = '${val}'`;
        connection.connect((err) => {
            if (err)
                reject(err);
            connection.query(sql, (err, res) => {
                if (err)
                    reject(err);
                let r = res[0];
                resolve({
                    avatar: r.avatar,
                    bio: r.bio,
                    created_at: r.created_at,
                    username: r.username,
                    verified: r.verified,
                    id: r.id,
                });
            });
        });
    });
}
module.exports = getUserByID;
//# sourceMappingURL=getUserByID.js.map