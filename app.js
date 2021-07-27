// Store all the fun in the MySQL database 

//const mysql = require('mysql');
//var connection;

/* Setup the initial database */
async function setupDB() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'joker',
        password: 'joker123'
    });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL Server!');
    });

    // Create the joker database if it does not already exist -- change the charset to include emojis
    connection.query("CREATE DATABASE IF NOT EXISTS joker DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;", function (err, result) {
        if (err) throw err;
        console.log("Joker database has been created.");
    });
    
    console.log("Database setup.")
    return;
}

/* Imports data from JSON (index.json) and stores in mysql */
async function initDataFromJSON() {
    // Ensure db is setup before inserting data
    await setupDB();
    console.log("Setting up DB");
    // Specify the database in the connection now
    connection.changeUser({
        database: 'joker'
    }, function (err) {
        if (err) throw err;
    });

    connection.query("DROP TABLE jokes;", function (err, result) {
        if (err) throw err;
    });

    // Create the jokes table if it doesn't already exist
    connection.query("CREATE TABLE IF NOT EXISTS jokes (id int(11) NOT NULL, type varchar(50), setup varchar(250), punchline varchar(300))", function (err, result) {
        if (err) throw err;
        console.log("jokes table setup.")
    });

    // Import the jokes from the JSON file supplied
    let jokes = require('./index.json');
    let values = []
    let keys = ['id', 'type', 'setup', 'punchline']

    // Create a values array for bulk insert
    // Iterate over each joke 
    for (let j = 0; j < jokes.length; j++) {
        let row = []
        let joke = jokes[j]
        // Iterate over each key
        for (let k = 0; k < keys.length; k++) {
            console.log(joke[keys[k]]);
            // Encode the strings as they contain emojis and other special characters
            row.push(encodeURIComponent(joke[keys[k]]));
        };

        values.push(row);
    };

    /* values = [
        ['1', 'type', 'setup', 'punchline'],
        ['2', 'type2', 'setup2', 'punchline2']
    ]; */

    //console.log(values)

    let sql = "INSERT INTO jokes (id, type, setup, punchline) VALUES ?";
    connection.query(sql, [values], function (err) {
        if (err) 
            throw err
        else
            console.log("Imported jokes.")
    });
}

//initDataFromJSON();

const express = require('express')
const path = require('path');
const app = express()
const port = 3000
const bodyParser = require("body-parser");

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

require("./routes/joke.routes.js")(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})