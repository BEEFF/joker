module.exports = app => {
    const jokes = require("../controllers/joke.controller.js");

    // Create a new Joke
    app.post("/jokes", jokes.create);

    // Retrieve all Jokes
    app.get("/jokes", jokes.findAll);

    // Get total number of jokes
    app.get("/jokes/total", jokes.total);

    // Get a single random joke given joke type
    app.get("/jokes/random/:jokeType", jokes.findOneByType);

    // Retrieve a single Joke with jokeId
    app.get("/jokes/:jokeId", jokes.findOne);

    // Update a Joke with jokeId
    app.put("/jokes/:jokeId", jokes.update);

    // Delete a Joke with jokeId
    app.delete("/jokes/:jokeId", jokes.delete);

    // Create a new Joke
    app.delete("/jokes", jokes.deleteAll);
};