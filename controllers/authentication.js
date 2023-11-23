const jwt = require('jwt-simple');
const User = require('../models/User');
const keys = require('../config/keys');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.cookieKey);
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user), userInfo: req.user });
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }


  User.findOne({ email: email })
    .then(async (err, existingUser) => {
      if (err) { return next(err); }

      // If a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }

      // If a user with email does NOT exist, create and save user record
      const user = new User({
        email: email,
        password: password
      });

      user.save()
        .then(user => {
          res.json({ token: tokenForUser(user) });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}