/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const { Schema, model } = require("./connection");

/////////////////////////////////////////
// Create schema
/////////////////////////////////////////
const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = model("User", usersSchema);


module.exports = User;
