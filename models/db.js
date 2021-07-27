const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

console.log(dbConfig);

// Create a MySQL Connection using defined config
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the joker database.");
});

module.exports = connection;