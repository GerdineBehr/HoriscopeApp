//module imports
const express = require("express"); //commonjs (dynamically loaded)
const app = express();
const http = require("http");
require("dotenv").config();

//local project imports
const cors = require("cors");
const { logger } = require("./backend/utils/logger");

//set up server
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "5mb" })); //middleware - parse json req.body
app.use(express.static("public")); //middleware - serve static files
app.use(cors());

//routing
app.get("/account", (req, res) => {});

// Port listen
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
