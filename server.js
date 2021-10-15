// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

/* Dependencies */
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// POST route
app.post("/add", addInfo);

function addInfo(req, res) {
  projectData["temp"] = req.body.temp;
  projectData["date"] = req.body.date;
  projectData["content"] = req.body.content;
  projectData["humidity"] = req.body.humidity;
  projectData["wind"] = req.body.wind;
  res.send(projectData);
}

// starting GET function 
app.get("/all", getInfo);

// Callback function to send the data to the app
function getInfo(req, res) {
  res.send(projectData);
}

// Set up and start the ser
const port = 8080;
const server = app.listen(port, () => {
  console.log(`server is listening on port: ${port}`); // Callback to debug
});