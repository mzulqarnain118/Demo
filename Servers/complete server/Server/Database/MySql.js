const mySql = require("mysql");
const databaseInfo = require("./DatabaseInfo");

const connection = mySql.createConnection({
  host: databaseInfo.host,
  port: databaseInfo.port,
  user: databaseInfo.user,
  password: databaseInfo.password,
  database: databaseInfo.databaseName,
});

connection.connect((err) => {
  if (err) console.log("Database Not Connected!",err);
  else console.log("Database Connected!");
});

module.exports = connection;
