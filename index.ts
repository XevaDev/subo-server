import express = require("express");
const app = express();

import bodyParser = require("body-parser");
import passwordhash = require("password-hash");
import Eechy from "express-eechy.js";

let clientUrl = "http://localhost:8080";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/useravatar", express.static("icons/users"));
app.use("/categoryicon", express.static("icons/communities"));

const PORT = process.env.PORT || 2000;

let eechy = new Eechy(app, `${__dirname}/api`, true);

eechy.runAllLibs();

// Open the server

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
