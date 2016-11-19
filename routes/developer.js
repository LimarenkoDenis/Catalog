const express = require('express');
const controller = require('../controller/developer');

const router = module.exports = express.Router();

router.param('developer', controller.param);

router.route('/developers')
  .get(controller.list)
  .post(controller.create);

router.route('/developers/:developer')
  .get(controller.detail)
  .put(controller.update)
  .delete(controller.remove);
