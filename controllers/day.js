/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const express = require("express");
const Day = require("../models/day");


/////////////////////////////////////////
// Create router
/////////////////////////////////////////
const router = express.Router();


/////////////////////////////////////////
// Days routes
/////////////////////////////////////////
// // removed the below route because we're seeding via "npm run seed" which pulls from /models/seed.js
// router.get("/seed", (req, res) => {
//   // array of starter days seed
// });

// index route
router.get("/", (req, res) => {
  Day.find({})
})