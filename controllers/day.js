/////////////////////////////////////////
// Setup
/////////////////////////////////////////
const express = require("express");
const Day = require("../models/day");


/////////////////////////////////////////
// Create router
/////////////////////////////////////////
const router = express.Router();


/////////////////////////////////////////
// Days routes
/////////////////////////////////////////

// index route
router.get("/", async (req, res) => {
  Day.find({})
    .sort({ name: -1 })    // used to sort by increasing days
    .then(days => {
      res.render("days/index.liquid", { days });
    })
    .catch(error => {
      res.json(error);
    });
});

// new route
router.get("/new", (req, res) => {
  let newDay = 0;
  Day.find({})
    .then(days => {
      newDay = days.length + 1;
      res.render("days/new.liquid", { newDay });
    })
    .catch(error => {
      res.json(error);
    });
});

// create route
router.post("/", (req, res) => {
  Day.create(req.body)
    .then(day => {
      res.redirect("/days");
    })
    .catch(error => {
      res.json(error);
    });
});

// edit route
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  let newDay = 0;
  Day.find({})
    .then(days => {
      newDay = days.length + 1;
    })
    .catch(error => {
      res.json(error);
    });
  Day.findById(id)
    .then(day => {
      res.render("days/edit.liquid", { day, newDay })
    })
    .catch(error => {
      res.json(error);
    });
});

// update route
router.put("/:id", (req, res) => {
  const id = req.params.id;
  Day.findByIdAndUpdate(id, req.body, { new: true })
    .then(fruit => {
      res.redirect(`/days/${id}`);
    })
    .catch(error => {
      res.json(error);
    });
});

// destroy route
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Day.findByIdAndRemove(id)
    .then(day => {
      res.redirect("/days");
    })
    .catch(error => {
      res.json(error);
    });
});

// show route
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Day.findById(id)
    .then(day => {
      res.render("days/show.liquid", { day });
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router;
