import mysql = require("mysql");
import passwordhash = require("password-hash");
import tokenGenerator = require("./tokenGenerator");

type user = {
  username: string;
  email: string;
  password: string;
  token?: string;
  avatar: string;
  id?: number;
  bio: string;
  createdAt?: Date;
  verified?: boolean;
};

function createAccount(user: user) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "subodb",
  });

  let hash = passwordhash.generate(user.password);
  let token = tokenGenerator();

  let sql = `INSERT INTO \`users\` (\`id\`, \`username\`, \`email\`, \`password\`, \`token\`, \`avatar\`, \`bio\`, \`created_at\`) VALUES (NULL, '${user.username}', '${user.email}', '${hash}', '${token}', '${user.avatar}', '${user.bio}', current_timestamp())`;

  connection.connect((err) => {
    if (err) throw err;
    connection.query(sql, (err, res) => {
      if (err) throw err;
    });
  });
}

export = createAccount;
