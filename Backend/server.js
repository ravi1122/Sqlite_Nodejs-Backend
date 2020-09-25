const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");
const PORT = 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Root endpoint
app.get("/", (req, res) => res.json({ message: "Ok" }));

routes(app);

// Default response for any other request
app.use((req, res) => res.status(404));

// Start server
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});