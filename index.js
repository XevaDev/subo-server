"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usernameAlreadyExists = require("./libs/usernameAlreadyExists");
const editUsername = require("./libs/editUsername");
const getCategory = require("./libs/getCategory");
const listCategory = require("./libs/listCategories");
const getUserByToken = require("./libs/getUser/getUserByToken");
const getUserByEmail = require("./libs/getUser/getUserByEmail");
const getUserByID = require("./libs/getUser/getUserByID");
let clientUrl = "http://localhost:8080";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 2000;
// Username length limitations
let usernameMinLength = 3;
let usernameMaxLength = 35;
// Check if the the client's token is a valid token account.
app.get("/users/private/exists/:token", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let tokenSeek = req.params.token;
    console.log(`Seeked for ${tokenSeek}`);
    // Get user with the token
    let u = await getUserByToken(tokenSeek);
    // Verify if a account has that token.
    if (typeof u === "undefined") {
        res.json({ token: tokenSeek, exists: false });
    }
    else {
        // Sent to the client that the token is valid.
        res.json({ token: u.token, exists: true });
    }
});
app.get("/users/private/get/:token", async (req, res) => {
    /* Get private infos thanks to the token. Don't share your token ! (even if tokens change every days
    for security.) */
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let token = req.params.token;
    let p = await getUserByToken(token);
    res.json(p);
});
// System to change username. Verifications are server-side only.
app.get("/users/private/editUsername/:token/:username", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let token = req.params.token;
    let newUsername = req.params.username || "";
    let jres = {
        statut: "error",
    };
    let alreadyEdited = false;
    // Username already exists, don't change.
    if (usernameAlreadyExists(newUsername)) {
        res.status(200).json(jres);
        return;
    }
    // Username doesn't respect the limitations, don't change.
    if (newUsername.length < usernameMinLength ||
        newUsername.length > usernameMaxLength) {
        res.status(200).json(jres);
        return;
    }
    if (alreadyEdited)
        return;
    let u = await getUserByToken(token);
    editUsername(u.token, newUsername);
    jres = {
        statut: "success",
    };
    alreadyEdited = true;
    // Send json informations about status.
    res.status(200).json(jres);
});
/* Login system. If you have the email and the password, you can have the token to connect every where
   But, some features need password. So, if the person have the token but not the password,
   he won't access to certains features
*/
app.get("/users/login/:email/:pw", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let email = req.params.email;
    let pw = req.params.pw;
    // Default datas
    let resj = {
        bad: true,
        token: null,
    };
    let u = await getUserByEmail(email);
    // Verify if the password match the the account that has that email.
    if (!(typeof u === "undefined")) {
        if (u.password === pw) {
            resj.bad = false;
            resj.token = u.token;
        }
    }
    res.status(200).json(resj);
});
/* It is essential for Subo. It is public informations, to get contents of the user, get avatar, etc.
   /!\ We can't connect to the others accounts of that user because private informations are hidden.
*/
app.get("/users/public/get/:id", async (req, res) => {
    let id = req.params.id;
    let u = await getUserByID(id);
    if (!u)
        return res.status(200).json({ error: "error" });
    res.status(200).json(u);
});
// Custom css to custom pages
app.get("/category/css/:id", (req, res) => {
    let id = req.params.id;
    res.status(200).send(getCategory(id).css);
});
app.get("/category/data/:id", (req, res) => {
    let id = req.params.id;
    res.status(200).json(getCategory(id));
});
app.get("/category/list", (req, res) => {
    res.status(200).json({ categories: listCategory() });
});
// Open the server
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
//# sourceMappingURL=index.js.map