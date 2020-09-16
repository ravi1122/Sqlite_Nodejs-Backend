// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var PORT = 8000
var bodyParser = require("body-parser")
const cors = require('cors')

app.use(bodyParser.json())
// app.use(databaseMiddleware)
app.use(cors())

// Start server
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});


// Insert here other API endpoints
app.get("/testsimulator", (req, res, next) => {
    var sql = "select * from Vss2Capability"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
app.get("/value", (req, res, next) => {
    var sql = "select * from Vss2Value where status = 'enabled'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": rows
        })
    });
});

app.get("/capability", (req, res, next) => {
    var sql = "select Vss2Capability.signal,Description,Type,DataType,Unit,Min,Max,Enum,id,status from Vss2Capability  INNER JOIN Vss2Value  ON Vss2Capability.Signal = Vss2Value.Signal WHERE Vss2Value.status = 'enabled'";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": rows
        })
    });
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});