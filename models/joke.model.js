const sql = require("./db.js");

// constructor
const Joke = function(Joke) {
  this.type = Joke.type;
  this.setup = Joke.setup;
  this.punchline = Joke.punchline;
};

Joke.create = (newjoke, result) => {
  sql.query("INSERT INTO jokes SET ?", newjoke, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Joke: ", { id: res.insertId, ...newjoke });
    result(null, { id: res.insertId, ...newjoke });
  });
};

Joke.findById = (jokeId, result) => {
  sql.query(`SELECT * FROM jokes WHERE id = ${jokeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Joke: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Joke with the id
    result({ kind: "not_found" }, null);
  });
};

Joke.getAll = result => {
  sql.query("SELECT * FROM jokes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("jokes: ", res);
    result(null, res);
  });
};

Joke.getTotal = result => {
  sql.query("SELECT COUNT(*) FROM jokes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("count: ", res);
    result(null, res);
  });
};

Joke.updateById = (id, Joke, result) => {
  sql.query(
    "UPDATE jokes SET type = ?, setup = ?, punchline = ? WHERE id = ?",
    [Joke.type, Joke.setup, Joke.punchline, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Joke with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Joke: ", { id: id, ...Joke });
      result(null, { id: id, ...Joke });
    }
  );
};

Joke.remove = (id, result) => {
  sql.query("DELETE FROM jokes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Joke with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Joke with id: ", id);
    result(null, res);
  });
};

Joke.removeAll = result => {
  sql.query("DELETE FROM jokes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} jokes`);
    result(null, res);
  });
};

module.exports = Joke;