var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')

        db.exec('PRAGMA foreign_keys = ON;', function (error) {
            if (error) {
                console.error("Pragma statement didn't work.")
            } else {
                console.log("Foreign Key Enforcement is on.")
            }
        });

        db.run(
            `CREATE TABLE Vss2Capability (
            Signal text PRIMARY KEY,
            Description text, 
            Type text, 
            DataType text, 
            Unit BLOB,
        	Min NUMERIC,
        	Max NUMERIC,
        	Enum text
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert1 = 'INSERT INTO Vss2Capability(Signal, Description, Type, DataType, Unit, Min, Max, Enum ) VALUES (?,?,?,?,?,?,?,?)'
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem", "Fuel system data", "Branch"])
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.AverageConsumption", "Average consumption in liters per 100 km", "sensor", "float", "l/100km", "0", "99"])
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.ConsumptionSinceStart", "Fuel amount consumed since start in liters", "sensor", "float", "liter"])
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.InstantConsumption", "Current consumption in liters per 100 km", "sensor", "float", "l/100km", "0"])
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.Level", "Level in fuel tank as percent of capacity. 0 = empty. 100 = full", "sensor", "unit8", "percent", "0", "100"])
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.LowFuelLevel", "Indicates that the fuel level is low (e.g. <50km range)", "sensor", "Boolean"])
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.Range", "Range in meters.", "sensor", "unint32", "m"])
                    db.run(insert1, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.TankCapacity", "Capacity of the fuel tank in liters", "attribute", "uint16", "liter"])
                }
            });

        db.run(
            `CREATE TABLE Vss2Value(
                Signal text PRIMARY KEY,
                    id real,
                    value NUMERIC,
                    status Text,  
                    FOREIGN KEY(Signal) REFERENCES Vss2Capability(Signal)                                                       
                    )`,

            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert2 = 'INSERT INTO Vss2Value(Signal, id, value, status) VALUES (?,?,?,?)'
                    // second table insertion
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem", "2ef65b5c8e875276b6b4af7400cb7c72", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.AverageConsumption", "5ae2839784a45785bc3fc6677ecec090", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.ConsumptionSinceStart", "d3627d6ae8bc5f6bbf871dcaa9d4aa01", "", "disabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.EngineStopStartEnabled", "eef6555638725023b7d6f3ed52adb2ba", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.FuelType", "7b17696fc26f5bdc84268990664288e3", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.HybridType", "a7c3f14fca665fe093bd687bf15d7e64", "", "disabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.InstantConsumption", "c01ad71ba0315cf1b4fe3e5f74548258", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.Level", "b3a4e2f57177584c843ceeb30b351e04", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.LowFuelLevel", "5118861236be501fbc8385cc55f74deb", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.Range", "ec7e69ae0f98517c8306f7d464997de7", "", "disabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.TankCapacity", "7d3f4e3c4c795dac93d5496071236c6a", "", "enabled"])
                    db.run(insert2, ["Vehicle.Powertrain.EnergyStorage.FuelSystem.TimeSinceStart", "f106a52d1b8d5541820c06f498847098", "", "enabled"])
                }
            });

    }
});


module.exports = db