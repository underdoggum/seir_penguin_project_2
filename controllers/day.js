// Logic for connecting mongo documents thanks to Alex Merced
// https://www.youtube.com/watch?v=cu6VQgT3EEI

/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const express = require("express");
const Day = require("../models/day");
const Exercise = require("../models/exercise");
const starterExercises = require("../models/starterExercises");


/////////////////////////////////////////
// Create router
/////////////////////////////////////////
const router = express.Router();


/////////////////////////////////////////
// Days routes
/////////////////////////////////////////
// index route (days/new)
router.get("/", async (req, res) => {
  Day.find({})
    .sort({ name: -1 })    // used to sort by decreasing days
    .then(days => {
      res.render("days/index.liquid", { days });
    })
    .catch(error => {
      res.json(error);
    });
});

// new route (days/new)
router.get("/new", (req, res) => {
  let newDay = 0;         // for suggesting new days and workoutTypes
  Day.find({})
    .then(days => {
      newDay = days.length + 1;
      res.render("days/new.liquid", { newDay });
    })
    .catch(error => {
      res.json(error);
    });
});

// create route (days/new)
router.post("/", (req, res) => {
  Day.create(req.body)
    .then(day => {
      // create an array of exercises based on the day's workout type that's selected
      const exercises = starterExercises[day.workoutType].map(e => {
        return { ...e, day: day._id };
      });
      // create the exercises in MongoDB
      Exercise.create(exercises)
        .then(theExercises => {
          theExercises.forEach(e => {
            day.exercises.push(e);
          });
          day.save()
            .then(e => {
              res.redirect(`/days/${day._id}`);
            })
            .catch(error => {
              res.json(error);
            });
        })
        .catch(error => {
          res.json(error);
        });
    })
    .catch(error => {
      res.json(error);
    });
});

////////
// edit route for exercises (days/dayId/workout_edit)
////////
router.get("/:dayId/edit_exercises", (req, res) => {
  const { dayId } = req.params;

  Day.findById(dayId)
    .populate("exercises")
    .then(day => {
      res.render("exercises/edit.liquid", { day });
    })
    .catch(error => {
      res.json(error);
    });
});

// update route for exercises (days/dayId)
router.put("/:dayId", (req, res) => {
  const { dayId } = req.params;
  console.log(req.body);
  Day.findByIdAndUpdate(dayId, req.body, { new: true })
    .populate("exercises")
    .then(day => {
      // try to delete everything inside of this day's exercises array, and push req.body.exercises, then finally save
      console.log(day);
      res.redirect(`/days/${dayId}`);
    })
    .catch(error => {
      res.json(error);
    });
});

// edit route (days/dayId/edit)
router.get("/:dayId/edit", (req, res) => {
  const { dayId } = req.params;

  // for suggesting new days
  let newDay = 0;
  Day.find({})
    .then(days => {
      newDay = days.length + 1;
    })
    .catch(error => {
      res.json(error);
    });
    
  Day.findById(dayId)
    .then(day => {
      res.render("days/edit.liquid", { day, newDay });
    })
    .catch(error => {
      res.json(error);
    });
});

// update route (days/dayId)
router.put("/:dayId", (req, res) => {
  const { dayId } = req.params;
  Day.findByIdAndUpdate(dayId, req.body, { new: true })
    .then(day => {
      res.redirect(`/days/${dayId}`);
    })
    .catch(error => {
      res.json(error);
    });
});

// destroy route (days/dayId)
router.delete("/:dayId", (req, res) => {
  const { dayId } = req.params;
  Day.findByIdAndRemove(dayId)
    .then(day => {
      res.redirect("/days");
    })
    .catch(error => {
      res.json(error);
    });
});

// show route (days/dayId)
router.get("/:dayId", (req, res) => {
  const { dayId } = req.params;
  Day.findById(dayId)
    .populate("exercises")
    .then(day => {
      // console.log(day);
      res.render("days/show.liquid", { day });
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;
