// import dependencis
var express = require("express");
var path = require("path");

// create an "express" server
var app = express();

// define port where server will listen
var PORT = process.env.PORT || 8080;

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// application data
var tables = [
    {
        customerName: "Table Test",
        customerEmail: "table@test.com",
        customerID: "0123456789",
        phoneNumber: "000-000-0000"
    }
];

var waitlist = [
    {
        customerName: "Waitlist Test",
        customerEmail: "waitlist@test.com",
        customerID: "9876543210",
        phoneNumber: "000-000-0000"
    }
];

// html routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/home.html"));
});
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/tables.html"));
});
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/reserve.html"));
});

// api routes
app.get("/api/tables", function (req, res) {
    res.json(tables);
});
app.post("/api/tables", function (req, res) {
    if (tables.length < 5) {
        tables.push(req.body);
        res.send(true);
    }
    else {
        waitlist.push(req.body);
        res.send(false);
    }
});
app.get("/api/waitlist", function (req, res) {
    res.json(waitlist);
});
app.delete("/api/clear", function (req, res) {
    // empty data arrays
    tables.length = 0;
    waitlist.length = 0;

    res.send("tables cleared");
});

// start the server
app.listen(PORT, function () {
    console.log("server is listening on http://localhost:" + PORT);
});
