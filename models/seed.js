/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const mongoose = require("./connection");
const Day = require("./day");


/////////////////////////////////////////
// Seed
/////////////////////////////////////////
const db = mongoose.connection;

db.on("open", () => {
  const startDays = [
    { name: "1", workoutType: "A" },
    { name: "2", workoutType: "B" },
    { name: "3", workoutType: "C" },
    { name: "4", workoutType: "Rest" },
  ];

  Day.deleteMany({})
    .then(data => {
      Day.create(startDays)
        .then(data => {
          console.log(data);
          db.close();
        });
    });
});
