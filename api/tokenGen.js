"use strict";
module.exports = {
    route: "/gen/token",
    run: async () => {
        let res = "";
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890";
        for (let i = 0; i < 61; i++) {
            res += str.split("")[Math.floor(Math.random() * str.split("").length)];
        }
        return { token: res };
    },
    params: [],
};
//# sourceMappingURL=tokenGen.js.map