const express = require('express');
const controller = require('../controller/customer');

const router = module.exports = express.Router();

router.param('customer', controller.param);

router.route('/customers')
  .get(controller.list)
  .post(controller.create);

router.route('/customers/:customer')
  .get(controller.detail)
  .put(controller.update)
  .delete(controller.remove);
