const Joke = require("../models/joke.model.js");

// Create and Save a new Joke
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Joke
    const joke = new Joke({
        type: req.body.type,
        setup: req.body.setup,
        punchline: req.body.punchline
    });

    // Save Joke in the database
    Joke.create(joke, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Joke."
            });
        else res.send(data);
    });
};

// Retrieve all Jokes from the database.
exports.findAll = (req, res) => {
    Joke.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving jokes."
            });
        else res.send(data);
    });
};

// Get the total number of jokes from the database
exports.total = (req, res) => {
    Joke.getTotal((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the total number of jokes."
            });
        else {
            let total = data[0]['COUNT(*)'];
            res.send(total.toString());
            
        }
    });
};

// Find a single Joke with a jokeId
exports.findOne = (req, res) => {
    Joke.findById(req.params.jokeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Joke with id ${req.params.jokeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Joke with id " + req.params.jokeId
                });
            }
        } else res.send(data);
    });
};

// Update a Joke identified by the jokeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Joke.updateById(
        req.params.jokeId,
        new Joke(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Joke with id ${req.params.jokeId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Joke with id " + req.params.jokeId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Joke with the specified jokeId in the request
exports.delete = (req, res) => {
    Joke.remove(req.params.jokeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Joke with id ${req.params.jokeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Joke with id " + req.params.jokeId
                });
            }
        } else res.send({
            message: `Joke was deleted successfully!`
        });
    });
};

// Delete all Jokes from the database.
exports.deleteAll = (req, res) => {
    Joke.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all jokes."
            });
        else res.send({
            message: `All Jokes were deleted successfully!`
        });
    });
};

