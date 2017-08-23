// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// customer (DATA)
// =============================================================
var customers = [{
  routeName: "jack",
  name: "Jack",
  Phonenumber: "626-324-2244",
  Email: "Jack@gmail.com",
  Id:"Jack"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Get all customers
app.get("/tables", function(req, res) {
  res.json(customers);
});

// Search for Specific customer (or all customers) - provides JSON
app.get("/api/:customers?", function(req, res) {
  var chosen = req.params.customers;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < customers.length; i++) {
      if (chosen === customers[i].routeName) {
        return res.json(customers[i]);
      }
    }
    return res.json(false);
  }
  return res.json(customers);
});

// Create New customer - takes in JSON input
app.post("/api/new", function(req, res) {
  var newcustomer = req.body;
  newcustomer.routeName = newcustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcustomer);

  customers.push(newcustomer);

  res.json(newcustomer);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
