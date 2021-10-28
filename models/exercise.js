/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const mongoose = require("./connection");

/////////////////////////////////////////
// Create Exercise model
/////////////////////////////////////////
const { Schema, model } = mongoose;

const exercisesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    min: 1
  },
  sets: {
    type: Number,
    required: true,
    min: 0
  },
  reps: {
    type: Number,
    required: true,
    min: 0
  },
  belongsToWorkoutType: {
    type: String,
    required: true
  }
});

const Exercise = model("Exercise", exercisesSchema);


module.exports = Exercise;
