"use strict";
// Get comment system.
// Import needed libraries.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComment = void 0;
const mysql = require("mysql");
// Function to get comment informations by id.
async function getComment(id) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "subodb",
        });
        let sql = `SELECT * FROM comments WHERE id = '${id}'`;
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
exports.getComment = getComment;
//# sourceMappingURL=getComment.js.map