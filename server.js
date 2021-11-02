/////////////////////////////////////////
// Setup
/////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
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
  }),
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
