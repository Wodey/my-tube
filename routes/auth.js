const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
  const {email, name, password, password2} = req.body;

  const existEmail = await User.find({email: email});
  if(existEmail.length) {
    res.send({
      type: 'error',
      code: 1
    });
    return;
  };
  const existName =  await User.find({name: name});
  if(existName.length) {
    res.send({
      type: 'error',
      code: 2
    });
    return;
  };

  if(password !== password2) {
    res.send({
      type: 'error',
      code: 3
    });
    return;
  };

  const newUser = new User({
    name: name,
    password: password,
    email: email
  });

  const result = await newUser.save();

  const token = jwt.sign({
    user: result
  }, process.env.JWT_KEY, {expiresIn: '1h'});

  res.send({
    type: 'success',
    code: 'success',
    token: token
  });

} catch (err) {
  console.error(err);
}
});

router.post('/login', (req, res) => {
  passport.authenticate('local', {session: false}, (err, user,info) => {
    if(err || !user) {
      return res.send({
        message: "something went wrong",
        type: 'error',
        code: 1,
        err: err,
        user: user
      })
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        return res.json(err);
      }
      const body = { id: user._id, email: user.email, name: user.name};

      const token = jwt.sign({
        user: body
      }, process.env.JWT_KEY, {expiresIn: '1h'});

      return res.json({
        token: token,
        code: 'success'
      });

    })
  })(req, res)
});

router.get('/forverifieduser', passport.authenticate("jwt",{session: false}), (req, res) => {
  res.json({
    message: "you made it",
    user: req.user
  })
})


module.exports = router;
