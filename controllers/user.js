// Logic for much of the user auth courtesy of Alex Merced
// https://www.youtube.com/watch?v=FOGGhGU0SMQ&list=PLY6oTPmKnKbZQSCfJLwPcbsH_koOC_F-t&index=10

/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const mongoose = require("../models/connection");
const Day = require("../models/day");
const Exercise = require("../models/exercise");
const { starterDays, starterExercises } = require("../models/seed");


/////////////////////////////////////////
// Create router
/////////////////////////////////////////
const router = express.Router();


/////////////////////////////////////////
// Generating starter exercises for a new user
/////////////////////////////////////////
const generateExercises = username => {
  Day.create(starterDays)
    .then(days => {
      days.forEach(day => {
        day.username = username;
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
                // console.log(day);
              });
          });
      });
    })
    .catch(error => {
      console.log(error);
      db.close();
    });
}


/////////////////////////////////////////
// Signup Routes
/////////////////////////////////////////
router.get("/signup", (req, res) => {
  res.render("auth/signup.liquid", { main: true });
});

router.post("/signup", async (req, res) => {
  // the below generates the encryped password with a "salt" of 10
  req.body.password = await bcrypt.hash(req.body.password, 10);
  User.create(req.body)
    .then(user => {
      if (user.username !== "admin") {
        generateExercises(req.body.username);
      }
      res.redirect("/auth/login");
    })
    .catch(error => {
      console.log(error);
    });
});


/////////////////////////////////////////
// Login Routes
/////////////////////////////////////////
router.get("/login", (req, res) => {
  res.render("auth/login.liquid", { main: true });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(async user => {
      if (user) {
        const result = await bcrypt.compare(password, user.password);

        // if the user exists and the password matches
        if (result) {
          req.session.login = true;
          req.session.username = username;
          res.redirect("/days");
        } else {
          // change to route to an error page
          res.redirect("/error?error=The%20password%20does%20not%20match");
        }
      } else {
        // change to route to an error page
        res.redirect("/error?error=That%20user%20does%20not%20exist");
      }
    })
    .catch(error => {
      console.log(error);
    })
});


/////////////////////////////////////////
// Logout Routes
/////////////////////////////////////////
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


module.exports = router;
