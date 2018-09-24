var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var router = express.Router();

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
 require("./config/routes")(router);

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + '/public'));

app.use(router);

// Connect to the Mongo DB

// mongoose.connect("mongodb://localhost/week18Populater", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, function(error){
  if (error){
    console.log(error);
  } else {
    console.log("mongoose is good to go");
  }
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});