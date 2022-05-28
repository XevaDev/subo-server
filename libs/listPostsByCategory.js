"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPostsByCategory = void 0;
const mysql_1 = __importDefault(require("mysql"));
// Async function to get all the posts in a category thanks to the category id.
async function listPostsByCategory(categoryId) {
    const connection = mysql_1.default.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "subodb",
    });
    let sql = `SELECT * FROM posts WHERE categoryId = '${categoryId}'`;
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
exports.listPostsByCategory = listPostsByCategory;
//# sourceMappingURL=listPostsByCategory.js.map