"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeQuery = void 0;
function closeQuery(connection) {
    connection.end((err) => {
        if (err)
            throw err;
    });
}
exports.closeQuery = closeQuery;
//# sourceMappingURL=closeQuery.js.map