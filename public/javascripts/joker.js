/* joker.js 
  - Retrieve jokes from the joke API (LOL)
*/

// Initial Jokestate is punchline as we call getRandomJoke onPageLoad 
var jokeState = 'punchline';

// Placeholder variables to ensure only one GET request per joke
var jokeID = "2";
var setup = "";
var punchline = "";
var totalJokes = 1;

// GENERAL FUNCTIONS
function generateNewID(min, max) {
  jokeID = Math.floor(Math.random() * (max - min + 1)) + min;
  // Get the new joke
}

// SERVER COMMUNICATION (API requests)

// Get a single joke by its jokeID
function getJokeByID() {
  generateNewID(1, parseInt(totalJokes));
  $.ajax({
    url: "/jokes/" + jokeID,
    cache: false,
    success: function(res){
      setup = decodeURIComponent(res['setup']);
      punchline = decodeURIComponent(res['punchline']);
      changeJokeButtonText();
    },
    error: function(jqXHR, textStatus, error) {
          console.log("Status: " + textStatus); console.log("Error: " + error);
    }
  });
};

// Get final joke jokeID for random range
function getTotalJokes() {
  $.ajax({
    url: "/jokes/total",
    cache: false,
    success: function(res){
      // Generate new jokeID in data range
      totalJokes = parseInt(res);
    },
    error: function(jqXHR, textStatus, error) {
      console.log("Status: " + textStatus); console.log("Error: " + error);
    },
    complete: function(data) {
      getJokeByID();
    }
  });
};

function getRandomJoke() {
  getTotalJokes();
};

function switchJokeState() {
  if (jokeState == 'setup') {
    jokeState = 'punchline'
  } else {
    jokeState = 'setup'
  };
};

// Change the text of the button depending on joke state
function changeJokeButtonText() {
  if (jokeState == 'setup') {
    $("#jokeButton").text(punchline);
    jokeState = 'punchline';
  } else {
    $("#jokeButton").text(setup);
    jokeState = 'setup';
  }
}

// FRONT-END (event-listeners ect)
$(document).ready(function () {

  // Set initial joke
  getRandomJoke();

  // Add joke button listener
  $("#jokeButton").click(function () {
    if (jokeState == 'setup') {
      changeJokeButtonText();
    } else {
      console.log("Fetching a new joke... ");
      getRandomJoke();
    }

  });
});

// CONSOLE OUTPUT
console.log("Loaded joke.js")