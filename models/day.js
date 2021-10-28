/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const mongoose = require("mongoose");

/////////////////////////////////////////
// Create Day model
/////////////////////////////////////////
const { Schema, model } = mongoose;

const daysSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  exerciseType: {
    type: String,
    required: true
  }
});

const Day = model("Day", daysSchema);


module.exports = Day;
