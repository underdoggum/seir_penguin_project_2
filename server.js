/////////////////////////////////////////
// Setup
/////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
// const path = require("path");
const DayRouter = require("./controllers/day");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");


/////////////////////////////////////////
// Create Express application object
/////////////////////////////////////////
const app = require("liquid-express-views")(express());


/////////////////////////////////////////
// Middleware
/////////////////////////////////////////
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  })
  // turn on below when deploying via Heroku
  // cookie: { secure: true }
}));


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
app.use("/days", DayRouter);
app.use("/auth", UserRouter);

// home page, checking basic connection
app.get("/", (req, res) => {
  res.render("index.liquid", { main: true });
  // res.send(`Welcome to gymrift! We're glad you're here, and you will be too.
  // Our goal is to maximize your bodybuilding efforts through the time-tested 3 day pull/push/legs workout split favorited by bodybuilding giants such as Arnold Schwartznegger.
  // The first 5 days are pre-filled with suggested exercises, but feel free to change these up.
  // When starting a new day of exercises, the next suggested workout is applied, but also feel free to adjust to your liking.`);
});

app.get("/error", (req, res) => {
  const error = req.query.error || res.redirect("404.html");

  res.render("error.liquid", { error })
})

// catch all for unknown routes
app.all("*", (req, res) => {
  res.redirect("404.html");
})


/////////////////////////////////////////
// Server listening
/////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
