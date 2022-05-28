"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectNudeDrawing = void 0;
const axios = require("axios");
async function detectNudeDrawing(url) {
    let res;
    const options = {
        method: "POST",
        url: "https://nsfw-image-classification1.p.rapidapi.com/img/nsfw",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": "nsfw-image-classification1.p.rapidapi.com",
            "X-RapidAPI-Key": "KEY",
        },
        data: `{"url":"${url}"}`,
    };
    res = await axios.default.request(options);
    return res;
}
exports.detectNudeDrawing = detectNudeDrawing;
//# sourceMappingURL=detectNudeDrawing.js.map