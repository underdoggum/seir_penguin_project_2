// Logic for much of the user auth courtesy of Alex Merced
// https://www.youtube.com/watch?v=FOGGhGU0SMQ&list=PLY6oTPmKnKbZQSCfJLwPcbsH_koOC_F-t&index=10

/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


/////////////////////////////////////////
// Create router
/////////////////////////////////////////
const router = express.Router();


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
      res.redirect("/auth/login");
    })
    .catch(error => {
      console.log(error);
    })
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
          res.status(400).json({ error: "Password does not match" });
        }
      } else {
        // change to route to an error page
        res.status(400).json({ error: "User does not exist" });
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
