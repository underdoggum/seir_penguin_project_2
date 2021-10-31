// This file is used to write custom middleware for routes

// checks if the user is logged in before hitting any other route
const auth = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}


module.exports = { auth };
