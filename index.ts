import express = require("express");

import bodyParser = require("body-parser");
import fs = require("fs");

import users = require("./database/data/users.json");

const app = express();
let clientUrl = "http://localhost:8080";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 2000;

let getUserByToken = (token: string) => {
  let k = users.users.find((u) => u.private.token === token);

  return k ? k : undefined;
};

let getUserByEmail = (email: string) => {
  let k = users.users.find((u) => u.private.email === email);

  return k ? k : undefined;
};

let getUserByID = (id: string) => {
  let k = users.users.find((u) => u.public.id === id);
  return k ? k : undefined;
};

let usernameMinLength = 3;
let usernameMaxLength = 35;

let usernameAlreadyExists = (username: string) => {
  let k = users.users.find((u) => u.public.username === username);

  return k ? true : false;
};

app.get("/users/private/exists/:token", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", clientUrl);
  let tokenSeek = req.params.token;
  console.log(`Seeked for ${tokenSeek}`);

  let u = getUserByToken(tokenSeek);

  if (typeof u === "undefined") {
    res.json({ token: tokenSeek, exists: false });
  } else {
    res.json({ token: u.private.token, exists: true });
  }
});

app.get("/users/private/get/:token", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", clientUrl);
  let token = req.params.token;
  let p = getUserByToken(token);
  res.json(p);
});

app.get("/users/private/editUsername/:token/:username", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", clientUrl);
  let token = req.params.token;
  let newUsername = req.params.username || "";

  let jres = {
    statut: "error",
  };

  let alreadyEdited = false;

  if (usernameAlreadyExists(newUsername)) {
    res.status(200).json(jres);
    return;
  }
  if (
    newUsername.length < usernameMinLength ||
    newUsername.length > usernameMaxLength
  ) {
    res.status(200).json(jres);
    return;
  }

  let u = getUserByToken(token);
  if (alreadyEdited) return;
  let index = users.users.indexOf(u);

  users["users"][index]["public"]["username"] = newUsername;

  fs.writeFileSync(
    `${__dirname}/database/data/users.json`,
    JSON.stringify(users)
  );

  jres = {
    statut: "success",
  };

  alreadyEdited = true;

  res.status(200).json(jres);
});

app.get("/users/login/:email/:pw", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", clientUrl);
  let email = req.params.email;
  let pw = req.params.pw;

  let resj = {
    bad: true,
    token: null,
  };

  let u = getUserByEmail(email);
  if (!(typeof u === "undefined")) {
    if (u.private.password === pw) {
      resj.bad = false;
      resj.token = u.private.token;
    }
  }

  res.status(200).json(resj);
});

app.get("/users/public/get/:id", (req, res) => {
  let id = req.params.id;

  let u = getUserByID(id);

  if (!u) return res.status(200).json({ error: "error" });
  res.status(200).json(u.public);
});

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
