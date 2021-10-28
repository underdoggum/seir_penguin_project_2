/////////////////////////////////////////
// Setup
/////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
// const Day = require("./models/day");
// const mongoose = require("mongoose");
const DayRouter = require("./controllers/day");  // for refactoring


/////////////////////////////////////////
// Create Express application object
/////////////////////////////////////////
const app = require("liquid-express-views")(express());


/////////////////////////////////////////
// Middleware
/////////////////////////////////////////
app.use(morgan("tiny"));    // used for logging requests
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
app.use("/days", DayRouter);



// home page, checking basic connection
app.get("/", (req, res) => {
  res.send("Hello there!");
});


/////////////////////////////////////////
// Server listening
/////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
