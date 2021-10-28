/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const mongoose = require("./connection");

/////////////////////////////////////////
// Create Day model
/////////////////////////////////////////
const { Schema, model } = mongoose;

const daysSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  workoutType: {
    type: String,
    required: true
  }
});

const Day = model("Day", daysSchema);


module.exports = Day;
