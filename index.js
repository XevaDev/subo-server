"use strict";
// Import libs.
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
// Database of users.
const users = require("./database/data/users.json");
const app = express();
let clientUrl = "http://localhost:8080";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 2000;
// Some functions to simplify a bit.
let getUserByToken = (token) => {
    let k = users.users.find((u) => u.private.token === token);
    return k ? k : undefined;
};
let getUserByEmail = (email) => {
    let k = users.users.find((u) => u.private.email === email);
    return k ? k : undefined;
};
let getUserByID = (id) => {
    let k = users.users.find((u) => u.public.id === id);
    return k ? k : undefined;
};
// Username length limitations
let usernameMinLength = 3;
let usernameMaxLength = 35;
// -
let usernameAlreadyExists = (username) => {
    let k = users.users.find((u) => u.public.username === username);
    return k ? true : false;
};
// Check if the the client's token is a valid token account.
app.get("/users/private/exists/:token", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let tokenSeek = req.params.token;
    console.log(`Seeked for ${tokenSeek}`);
    // Get user with the token
    let u = getUserByToken(tokenSeek);
    // Verify if a account has that token.
    if (typeof u === "undefined") {
        res.json({ token: tokenSeek, exists: false });
    }
    else {
        // Sent to the client that the token is valid.
        res.json({ token: u.private.token, exists: true });
    }
});
app.get("/users/private/get/:token", (req, res) => {
    /* Get private infos thanks to the token. Don't share your token ! (even if tokens change every days
    for security.) */
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let token = req.params.token;
    let p = getUserByToken(token);
    res.json(p);
});
// System to change username. Verifications are server-side only.
app.get("/users/private/editUsername/:token/:username", (req, res) => {
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
    let u = getUserByToken(token);
    if (alreadyEdited)
        return;
    let index = users.users.indexOf(u);
    // Changing the username directly in the database with json manipulations
    users["users"][index]["public"]["username"] = newUsername;
    fs.writeFileSync(`${__dirname}/database/data/users.json`, JSON.stringify(users));
    // - Json manipulations ends
    // It was made with success
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
app.get("/users/login/:email/:pw", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let email = req.params.email;
    let pw = req.params.pw;
    // Default datas
    let resj = {
        bad: true,
        token: null,
    };
    let u = getUserByEmail(email);
    // Verify if the password match the the account that has that email.
    if (!(typeof u === "undefined")) {
        if (u.private.password === pw) {
            resj.bad = false;
            resj.token = u.private.token;
        }
    }
    res.status(200).json(resj);
});
/* It is essential for Subo. It is public informations, to get contents of the user, get avatar, etc.
   /!\ We can't connect to the others accounts of that user because private informations are hidden.
*/
app.get("/users/public/get/:id", (req, res) => {
    let id = req.params.id;
    let u = getUserByID(id);
    if (!u)
        return res.status(200).json({ error: "error" });
    res.status(200).json(u.public);
});
// Open the server
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
//# sourceMappingURL=index.js.map