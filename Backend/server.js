// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var PORT = 8000
var bodyParser = require("body-parser")
const cors = require('cors')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json())
// app.use(databaseMiddleware)
app.use(cors())

// Start server
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
});
// Root endpoint
app.get("/", (req, res, next) => {
    return res.json({ "message": "Ok" })
});

app.use(bodyParser.urlencoded({ extended: false }));

// Insert here other API endpoints
app.get("/testsimulator", (req, res, next) => {
    var sql = "select * from Vss2Capability"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
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
            return res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": rows
        })
    });
});

app.get("/capability", (req, res, next) => {
    var showSQL = "select Vss2Capability.signal,Description,Type,DataType,Unit,Min,Max,Enum,id,value,status from Vss2Capability  INNER JOIN Vss2Value  ON Vss2Capability.Signal = Vss2Value.Signal WHERE Vss2Value.status = 'enabled'";
    var params = []
    db.all(showSQL, params, (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "data": rows
        })
    });
});

//post method
app.post("/entry", (req, res) => {
    var errors = []
    var data = {
        Signal: req.body.Signal,
        Description: req.body.Description,
        Type: req.body.Type,
        DataType: req.body.DataType,
        Unit: req.body.Unit,
        Min: req.body.Min,
        Max: req.body.Max,
        Enum: req.body.Enum,
        id: req.body.id,
        value: req.body.value,
        status: req.body.status
    }

    var entrySQL1 = 'INSERT INTO Vss2Capability (Signal, Description, Type, DataType, Unit, Min, Max, Enum) VALUES (?,?,?,?,?,?,?,?)'
    var entryparams1 = [data.Signal, data.Description, data.Type, data.DataType, data.Unit, data.Min, data.Max, data.Enum]

    db.run(entrySQL1, entryparams1, function (err, result) {
        if (err) {
            return res.status(400).json({ "error": err.message })
        } else {
            var entrySQL2 = 'INSERT INTO Vss2Value (Signal, id, value, status) VALUES (?,?,?,?)'
            var entryparams2 = [data.Signal, data.id, data.value, data.status]

            db.run(entrySQL2, entryparams2, function (err, result) {
                if (err) {
                    return res.status(400).json({ "error": err.message })
                }
                res.json({
                    "data": data,
                })
            });
        }
    });
    res.end('Cannot ' + req.method + ' ' + req.url);
    console.log("data inserted")
})

//update the value
app.put("/updatevalue/:Signal", (req, res) => {
    var errors = [];
    var data = {
        Signal: req.body.Signal,
        Description: req.body.Description,
        Type: req.body.Type,
        DataType: req.body.DataType,
        Unit: req.body.Unit,
        Min: req.body.Min,
        Max: req.body.Max,
        Enum: req.body.Enum,
        id: req.body.id,
        value: req.body.value,
        status: req.body.status
    }

    var updateSQL1 = 'UPDATE Vss2Capability set  Signal = COALESCE(?,Signal), Description= COALESCE(?,Description), Type = COALESCE(?,Type), DataType = COALESCE(?,DataType), Unit = COALESCE(?,Unit),Min = COALESCE(?,Min),Enum = COALESCE(?,Enum), WHERE Signal = ?`,'
    var updateparams1 = [data.Signal, data.Description, data.Type, data.DataType, data.Unit, data.Min, data.Max, data.Enum, req.params.Signal];
    db.run(updateSQL1, updateparams1, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message })
            return;
        } else {
            var updateSQL2 = 'UPDATE Vss2Value set Signal = COALESCE(?,Signal), id = COALESCE(?,id), value = COALESCE(?,value) status = COALESCE(?,status) WHERE Signal = ?`'
            var updateparams2 = [data.Signal, data.id, data.value, data.status]
            db.run(updateSQL2, updateparams2, function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    message: "success",
                    data: data,
                    changes: this.changes
                })
            });
        }
    });
})

//delete value
app.delete("/deletedvalue/:signal", (req, res, next) => {
    var deleteSQL1 = 'DELETE FROM Vss2Capability WHERE signal = ?'
    db.run(deleteSQL1, req.params.signal, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message })
            return;
        } else {
            var deleteSQL2 = 'DELETE FROM Vss2Value WHERE signal = ?'
            db.run(deleteSQL2, req.params.signal, function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", changes: this.changes })
            });
        }
    });
})


// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});