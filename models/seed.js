/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const mongoose = require("./connection");
const Day = require("./day");
const Exercise = require("./exercise");
const starterExercises = require("./starterExercises");


/////////////////////////////////////////
// Seed
/////////////////////////////////////////
const db = mongoose.connection;

db.on("open", () => {
  // Day seed
  const starterDays = [
    { name: 1, workoutType: "Pull" },
    { name: 2, workoutType: "Rest" },
    { name: 3, workoutType: "Push" },
    { name: 4, workoutType: "Legs" },
    { name: 5, workoutType: "Rest" },
  ];

  // erase all days and all exercises to re-seed
  Day.deleteMany({})
    .then(data => {
      Exercise.deleteMany({})
        .then(data => { console.log(data) });
      Day.create(starterDays)
        .then(days => {
          // need to seed each day with respective exercises
          days.forEach(day => {
            const exercises = starterExercises[day.workoutType].map(e => {
              return { ...e, day: day._id };
            });
            Exercise.create(exercises)
              .then(theExercises => {
                theExercises.forEach(e => {
                  day.exercises.push(e);
                });
                day.save()
                  .then(e => {
                    console.log(day);
                  });
              });
          });
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
      // if I put db.close() in here, it's will return an error!
});
