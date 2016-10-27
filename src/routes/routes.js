import express from 'express'

const router = express.Router();

import indexController from '../controllers/index'

router.route('/')
  .get(indexController.index);

module.exports = router;
