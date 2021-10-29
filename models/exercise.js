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
    min: 0
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
  day: {
    type: mongoose.Types.ObjectId,
    ref: "Day"
  }
});

const Exercise = model("Exercise", exercisesSchema);


module.exports = Exercise;
