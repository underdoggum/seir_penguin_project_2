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
  // reset days
  const startDays = [
    { name: 1, workoutType: "A (pull)" },
    { name: 2, workoutType: "Rest" },
    { name: 3, workoutType: "B (push)" },
    { name: 4, workoutType: "C (legs)" },
    { name: 5, workoutType: "Rest" },
  ];
  Day.deleteMany({})
    .then(data => {
      Day.create(startDays)
        .then(data => {
          console.log(data);
          db.close();
        })
        .catch(error => {
          console.log(error);
          db.close();
        });
    })
    .catch(error => {
      console.log(error);
      db.close();
    });

    // // reset Exercises
    // const startExercises = [
    //   { name: 1, workoutType: "A (pull)" },
    //   { name: 2, workoutType: "Rest" },
    //   { name: 3, workoutType: "B (push)" },
    //   { name: 4, workoutType: "C (legs)" },
    //   { name: 5, workoutType: "Rest" },
    // ];
    // Day.deleteMany({})
    //   .then(data => {
    //     Day.create(startDays)
    //       .then(data => {
    //         console.log(data);
    //         db.close();
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         db.close();
    //       });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     db.close();
    //   });
});
