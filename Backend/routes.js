const cntrl = require("./controllers");

module.exports = (app) => {
    app.get("/capabilities", cntrl.getCapabilities);
    app.post("/capabilities", cntrl.createCapability);
    app.put("/capabilities/:signal", cntrl.updateCapability);
    app.delete("/capabilities/:signal", cntrl.deleteCapability);
};
