const dotenv = require("dotenv");
dotenv.config();
// Setup empty JS object to act as endpoint for all routes
let tripData = [];

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// Setup Server
const port = 3001;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log("Server Running");
  console.log(`Running on localhost: ${port}`);
}

// Initialize all route with a callback function
app.get("/allTrips", (request, response) => {
  // Callback function to complete GET '/all'
  response.send(tripData);
});

// Post Route
app.post("/addTrip", (req, res) => {
  tripEntry = {
    tripId: req.body.tripId,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    city: req.body.city,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    summary: req.body.summary,
    icon: req.body.icon,
    tempHigh: req.body.tempHigh,
    tempLow: req.body.tempLow,
    images: req.body.images,
    remainingDays: req.body.remainingDays,
    tripDuration: req.body.tripDuration,
    distance: req.body.distance
  };
  tripData.push(tripEntry);
  res.send(tripData);
});

module.exports = app;
