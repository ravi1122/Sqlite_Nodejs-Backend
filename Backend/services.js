const db = require("./database");
const sqlCommands = require("./sqlCommands");

exports.getCapabilities = () => {
  return new Promise((fulfill, reject) => {
    db.all(sqlCommands.selectCapabilitiesSQL, [], (err, rows) => {
      if (err) return reject(err);

      return fulfill(rows);
    });
  });
};

exports.createCapability = (cap) => {
  const params = sqlCommands.fieldsCapabilities.map((field) => cap[field]);

  return new Promise((fulfill, reject) => {
    db.run(sqlCommands.insertCapabilities, params, (err) => {
      if (err) return reject(err);

      const params = sqlCommands.fieldsValues.map((field) => cap[field]);

      db.run(sqlCommands.insertValues, params, (err) => {
        return err ? reject(err) : fulfill({ message: "success" });
      });
    });
  });
};

exports.updateCapability = (key, cap) => {
  const capQuery = ["UPDATE Vss2Capability set Signal = COALESCE(?, Signal)"];
  const capParams = [key];
  const valQuery = ["UPDATE Vss2Value set Signal = COALESCE(?, Signal)"];
  const valParams = [key];

  const fields = Object.keys(cap);

  for (let field of fields) {
    if (field !== "Signal") {
      if (sqlCommands.fieldsCapabilities.includes(field)) {
        capQuery.push(`${field}= COALESCE(?, ${field})`);
        capParams.push(cap[field]);
      }

      if (sqlCommands.fieldsValues.includes(field)) {
        valQuery.push(`${field}= COALESCE(?, ${field})`);
        valParams.push(cap[field]);
      }
    }
  }

  return new Promise((fulfill, reject) => {
    capQuery.push();
    db.run(
      [capQuery.join(", "), "WHERE Signal = ?"].join(" "),
      [...capParams, key],
      (err) => {
        if (err) return reject(err);

        db.run(
          [valQuery.join(", "), "WHERE Signal = ?"].join(" "),
          [...valParams, key],
          (err) => {
            return err ? reject(err) : fulfill({ message: "success" });
          }
        );
      }
    );
  });
};

exports.deleteCapability = (signal) => {
  return new Promise((fulfill, reject) => {
    db.run(sqlCommands.deleteValues, signal, (err) => {
      if (err) return reject(err);

      db.run(sqlCommands.deleteCapabilities, signal, (err) => {
        return err ? reject(err) : fulfill({ message: "success" });
      });
    });
  });
};
