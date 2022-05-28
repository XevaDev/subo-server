"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectNude = void 0;
const axios = require("axios");
async function detectNude(url) {
    let res;
    const options = {
        method: "POST",
        url: "https://nuditysearch.p.rapidapi.com/nuditySearch/image",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": "nuditysearch.p.rapidapi.com",
            "X-RapidAPI-Key": "KEY",
        },
        data: `{"objectUrl":"${url}"}`,
    };
    res = await axios.default.request(options);
    return res;
}
exports.detectNude = detectNude;
//# sourceMappingURL=detectNude.js.map