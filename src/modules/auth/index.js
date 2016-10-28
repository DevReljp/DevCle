var express = require('express');
var router = express.Router();
var plugins = require('../../plugins');
var common  = require('../../libs/common');
var controller = require('./controller')

router.all('*',  (req, res, next) => {
  controller.all(req, res, next);
});

router.get('/new', (req, res, next) => {
  controller.new(req, res, next);
});

// Create user
router.post('/', (req, res, next) => {
  controller.create(req, res, next);
});

router.delete('/', (req, res, next) => {
  controller.destroy(req, res, next);
});


module.exports = {
  router: router
};
