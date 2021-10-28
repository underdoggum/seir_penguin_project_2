/////////////////////////////////////////
// Setup
/////////////////////////////////////////
require("dotenv").config();
const mongoose = require("mongoose");


/////////////////////////////////////////
// Establish database connection
/////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(DATABASE_URL, CONFIG);

mongoose.connection
  .on("open", () => { console.log("Connected to Mongo") })
  .on("close", () => { console.log("Disconnected from Mongo") })
  .on("error", error => { console.log(error) });


module.exports = mongoose;
