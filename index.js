const express = require("express");

const bodyParser = require("body-parser");

let users = require("./database/data/users.json").users;

const app = express();
let clientUrl = "http://localhost:8080";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 2000;

let getUserByToken = (token) => {
  let k = users.map((u) => {
    if (u.private.token === token) return u;
  });

  return k[0];
};

let getUserByEmail = (email) => {
  let k = users.map((u) => {
    if (u.private.email === email) return u;
  });

  return k[0];
};

let getUserByID = (id) => {
  let k = users.map((u) => {
    if (u.public.id === id) return u.public;
  });

  return k[0];
};

let saveJson = (filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(require(filePath)));
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

app.get(
  "/users/private/editUsername/:token/:password/:username",
  (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", clientUrl);
    let token = req.params.token;
    let password = req.params.password;
    let newUsername = req.params.username;

    let x = getUserByToken(token);
    if (x.private.password === password) {
    }
  }
);

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
