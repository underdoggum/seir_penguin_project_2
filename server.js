/////////////////////////////////////////
// Setup
/////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const liquid = require("liquid-express-views");
const mongoose = require("mongoose");
// const DayRouter = require("./controllers/day");  // for refactoring


/////////////////////////////////////////
// Database connection
/////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(DATABASE_URL, CONFIG);
mongoose.connection
.on("open", () => { console.log("Connected to Mongo") })
.on("close", () => { console.log("Disconnected from Mongo") })
.on("error", error => { console.log(error) });


/////////////////////////////////////////
// Model
/////////////////////////////////////////
const { Schema, model } = mongoose;

const daysSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  workoutType: {
    type: String,
    required: true
  }
});

const Day = model("Day", daysSchema);


/////////////////////////////////////////
// Create Express application object
/////////////////////////////////////////
const app = liquid(express(), { root: [path.resolve(__dirname, "views/")] });


/////////////////////////////////////////
// Middleware
/////////////////////////////////////////
app.use(morgan("tiny"));    // used for logging requests
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
const db = mongoose.connection;

// seed route
app.get("/days/seed", (req, res) => {
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

app.get("/", (req, res) => {
  res.send("Hello there!");
});

// index route
app.get("/days", async (req, res) => {
  const days = await Day.find({});
  res.render("days/index.liquid", { days });
});

// new route
app.get("/days/new", (req, res) => {
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
app.post("/days", (req, res) => {
  Day.create(req.body)
    .then(day => {
      res.redirect("/days");
    })
    .catch(error => {
      res.json(error);
    });
});

// edit route
app.get("/days/:id/edit", (req, res) => {
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
app.put("/days/:id", (req, res) => {
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
app.delete("/days/:id", (req, res) => {
  const id = req.params.id;
  Day.findByIdAndRemove(id)
    .then(day => {
      res.redirect("/days");
    })
    .catch(error => {
      res.json(error);
    });
})




// show route
app.get("/days/:id", async (req, res) => {
  const id = req.params.id;
  Day.findById(id)
    .then(day => {
      res.render("days/show.liquid", { day });
    })
    .catch(error => {
      res.json(error);
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
