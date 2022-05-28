"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const express_eechy_js_1 = __importDefault(require("express-eechy.js"));
let clientUrl = "http://localhost:8080";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/useravatar", express.static("icons/users"));
app.use("/categoryicon", express.static("icons/communities"));
const PORT = process.env.PORT || 2000;
let eechy = new express_eechy_js_1.default(app, `${__dirname}/api`, true);
eechy.runAllLibs();
// Open the server
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
//# sourceMappingURL=index.js.map