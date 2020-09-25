const services = require("./services");

exports.getCapabilities = async (req, res) => {
    try {
        const rows = await services.getCapabilities();

        res.json({ data: rows });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.createCapability = async (req, res) => {
    try {
        const result = await services.createCapability(req.body);

        return res.json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.updateCapability = async (req, res) => {
    try {
        const { key, values } = req.body;
        const result = await services.updateCapability(key, values);

        return res.json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.deleteCapability = async (req, res) => {
    try {
        const result = await services.deleteCapability(req.params.signal);

        return res.json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
