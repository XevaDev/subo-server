const express = require("express");

const bodyParser = require("body-parser");

let usersFilePath = `${__dirname}/database/data/users.json`;
let users = require(usersFilePath).users;

const app = express();
let clientUrl = "http://localhost:8080";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 2000;

let getUserByToken = (token) => {
  let k = users.find((u) => u.private.token === token);

  return k ? k : undefined;
};

let getUserByEmail = (email) => {
  let k = users.find((u) => u.private.email === email);

  return k ? k : undefined;
};

let getUserByID = (id) => {
  let k = users.map((u) => u.public.id === id);

  return k ? k : undefined;
};

let usernameMinLength = 3;
let usernameMaxLength = 35;

let usernameAlreadyExists = (username) => {
  let k = users.find((u) => u.public.username === username);

  return k ? true : false;
};

app.get("/pages/reg", (req, res) => {
  res.redirect(`${clientUrl}/?page=9`);
  console.log(`Client ${req.ip} redirected on Register`);
});

app.get("/pages/nect", (req, res) => {
  res.redirect(`${clientUrl}/?page=10`);
  console.log(`Client ${req.ip} redirected on Connect`);
});

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
  let p = getUserByToken(token).public;
  res.json(Object(p));
});

app.get("/users/private/editUsername/:token/:username", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", clientUrl);
  let token = req.params.token;
  let newUsername = req.params.username;

  let jres = {
    statut: "error",
  };

  if (!usernameAlreadyExists(newUsername)) {
    let u = users.find((l) => l.private.token === token);
    u["public"]["username"] = newUsername;

    fs.writeFileSync(usersFilePath, JSON.stringify(require(users)));

    jres = {
      statut: "success",
    };
  }

  res.json(Object(jres));
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

  res.status(200).json(Object(resj));
});

app.listen(PORT, () => {});
