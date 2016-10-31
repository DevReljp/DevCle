var express = require('express');
var router = express.Router();
var plugins = require('../plugins');
var common  = require('../libs/common');
var controller = require('./controller')

// Every methods go through this function.
// You can use it for before filter like checking authentication.
router.all('*',  (req, res, next) => {
  controller.all(req, res, next);
});

// GET /
router.get('/', (req, res, next) => {
  controller.index(req, res, next);
});

// Return with router key.
module.exports = {
  router: router
};
