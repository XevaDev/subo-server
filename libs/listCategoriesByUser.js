"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategoriesByUser = void 0;
const mysql_1 = __importDefault(require("mysql"));
// Async function to list all the categories created by a user thanks to the user id.
function listCategoriesByUser(authorId) {
    const connection = mysql_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `SELECT * FROM categories WHERE authorId = '${authorId}'`;
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
exports.listCategoriesByUser = listCategoriesByUser;
//# sourceMappingURL=listCategoriesByUser.js.map