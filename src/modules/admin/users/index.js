var express = require('express');
var router = express.Router();
var plugins = require('../../../plugins');
var common  = require('../../../libs/common');
var controller = require('./controller')

// Every methods go through this function.
// You can use it for before filter like checking authentication.
router.all('*',  (req, res, next) => {
  controller.all(req, res, next);
});

// GET admin/users//new
// Show create page
router.get('/new', (req, res, next) => {
  controller.new(req, res, next);
});

// POST admin/users/
// Create something.
router.post('/', (req, res, next) => {
  controller.create(req, res, next);
});

// GET admin/users//:id/edit
// Show edit page
router.get('/:id/edit', (req, res, next) => {
  controller.edit(req, res, next);
});

// PUT admin/users//:id
// Update something.
router.put('/', (req, res, next) => {
  controller.update(req, res, next);
});

// DELETE admin/users//:id
// Delete something.
router.delete('/:id', (req, res, next) => {
  controller.destroy(req, res, next);
});

// Return with router key.
module.exports = {
  router: router
};
