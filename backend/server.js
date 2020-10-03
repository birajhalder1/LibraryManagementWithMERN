const express = require("express");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

//Load env
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectionDB();

// Load Route File
const book = require("./routes/books");
const admin = require("./routes/admin");
const user = require("./routes/user");

//Load express framework
const app = express();

// Cors enable
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Middleware route
app.use("/api/v1/books", book);
app.use("/api/v1/admin", admin);
app.use("/api/v1/user", user);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode and port no ${PORT}`
  )
);

//Handle unhandle rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
