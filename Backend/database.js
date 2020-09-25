var sqlite3 = require('sqlite3').verbose()
const sqlCommands = require("./sqlCommands");
const initData = require("./seed");

const DBSOURCE = "db.sqlite"

const db = new sqlite3.Database(DBSOURCE, async (err) => {

    if (err) {
        console.log(err.message);
        throw err;
    } else {
        await db.exec("PRAGMA foreign_keys = ON;", (error) => {
            if (error) {
                console.log("PRAGMA statements didnt't work.");
            } else {
                console.log("Foreign Key Enforcement is on .");
            }
        });

        await db.run(sqlCommands.createTableCapabilities, (err) => {
            if (err) {
                //table already created
            } else {
                const stmt = db.prepare(sqlCommands.insertCapabilities);
                initData.vss2Capability.forEach(async (row) => await stmt.run(row));
                stmt.finalize();
            }
        });

        await db.run(sqlCommands.createTableValues, (err) => {
            if (err) {
                //table already created
            } else {
                const stmt = db.prepare(sqlCommands.insertValues);
                initData.vss2Value.forEach(async (row) => await stmt.run(row));
                stmt.finalize();
            }
        });

        await db.run(sqlCommands.createTableCapabilities, (err) => {
            if (err) {
                //table already created
            } else {
                const stmt = db.prepare(sqlCommands.insertCapabilities);
                initData.vss2Capability.forEach(async (row) => await stmt.run(row));
                stmt.finalize();
            }
        });

        console.log("Connected to the SQLite database");
    }

});

module.exports = db;