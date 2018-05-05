var express = require("express");
var router = express.Router();
var User = require("../model/User");
var passport = require('passport');

// Beléptetjük a frissen regisztrált felhasználót.
var authenticate = User.authenticate();
var auth = (username, password, callBack) => {
  authenticate(username, password, function (err, result) {
    if (err) {
      return callBack({
        error: "User not athenticated."
      });
    }
    // Sikeres belépés esetén visszaküldjük a felhasználó adatait.
    callBack(null);
  });
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello Family!");
});

/* GET a user by ID. */
router.get("/byusername/:username", function (req, res, next) {
  User.findOne({
      username: req.params.username
    },
    function (err, user) {
      if (err) {
        // ha nem találja
        return res.json({
          error: 'User not found'
        });
      } else {
        res.json(user);
      }
    });
});

/**
 * Register new user.
 */
router.post("/register", (req, res, next) => {
  // Registráljuk az új felhalsználót, a post body adatai alapján
  User.register({
      username: req.body.username,
      email: req.body.email,
      address: req.body.address
    },
    req.body.password,
    function (err, newUser) {
      if (err) {
        // Regisztrációs hiba esetén.
        return res.json({
          error: "Bad registration data."
        });
      }

      auth(req.body.username, req.body.password, (err) => {
        if (err) {
          return res.json(err);
        }
        delete req.body.password;
        req.body._id = newUser._id;
        res.json(req.body);
      });
    }
  );
});

/**
 * Felhasználó beléptetése.
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});


/**
 * Felhasználó kiléptetése.
 */
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;