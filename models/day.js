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
    type: Number,
    required: true
  },
  workoutType: {
    type: String,
    required: true
  },
  exercises: {
    type: [mongoose.Types.ObjectId],
    ref: "Exercise"
  },
  username: String
});

const Day = model("Day", daysSchema);


module.exports = Day;
