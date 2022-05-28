"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listComments = void 0;
const mysql_1 = __importDefault(require("mysql"));
// Async function to list all comments of a post thanks to post id.
async function listComments(postId) {
    const connection = mysql_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `SELECT * FROM comments WHERE postId = '${postId}'`;
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err)
                reject(err);
            connection.query(sql, (err, res) => {
                if (err)
                    reject(err);
                resolve(res);
            });
        });
    });
}
exports.listComments = listComments;
//# sourceMappingURL=listComments.js.map