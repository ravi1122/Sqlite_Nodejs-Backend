// DDL and DML
exports.createTableCapabilities = `
CREATE TABLE Vss2Capability (
  Signal text PRIMARY KEY,
  Description text,
  Type text,
  DataType text,
  Unit BLOB,
  Min NUMERIC,
  Max NUMERIC,
  Enum text
)
`;

exports.createTableValues = `
CREATE TABLE Vss2Value(
  Signal text PRIMARY KEY,
  id real,
  value NUMERIC,
  status Text,
  FOREIGN KEY(Signal) REFERENCES Vss2Capability(Signal)
)
`;

exports.fieldsCapabilities = [
  "Signal",
  "Description",
  "Type",
  "DataType",
  "Unit",
  "Min",
  "Max",
  "Enum",
];

exports.fieldsValues = ["Signal", "id", "value", "status"];

exports.selectCapabilitiesSQL =
  "SELECT Vss2Capability.Signal,Description,Type,DataType,Unit,Min,Max,Enum,id,value,status FROM Vss2Capability  INNER JOIN Vss2Value ON Vss2Capability.Signal = Vss2Value.Signal WHERE Vss2Value.status = 'enabled'";

exports.insertCapabilities =
  "INSERT INTO Vss2Capability (Signal, Description, Type, DataType, Unit, Min, Max, Enum) VALUES (?,?,?,?,?,?,?,?)";
exports.insertValues =
  "INSERT INTO Vss2Value (Signal, id, value, status) VALUES (?,?,?,?)";

exports.deleteCapabilities = "DELETE FROM Vss2Capability WHERE Signal = ?";
exports.deleteValues = "DELETE FROM Vss2Value WHERE Signal = ?";
