var express = require('express');
var router = express.Router();
var plugins = require('../../plugins');
var common  = require('../../libs/common');


router.all('*',  (req, res, next) => {
  var User = plugins.find('User')[0];
  if (req.session.currentUser) {
    req.session.currentUser = new User(req.session.currentUser);
  }
  expected = [{
    url: '/new', method: 'GET'
  }];
  common.expected_login(expected, req, res);
  next();
});

router.get('/new', (req, res, next) => {
  res.render(`${__dirname}/views/index`); 
});

// Create user
router.post('/', (req, res, next) => {
  var User = plugins.find('User')[0];
  User.login(req.body.userId, req.body.password)
    .then((user) => {
      req.session.currentUser = user;
      res.status(200).json(user);
    },
    (err) => {
      res.status(400).json(err);
    })
});

var Auth = {
  router: router
};


module.exports = Auth;
