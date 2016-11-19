const express = require('express');
const controller = require('../controller/project');

const router = module.exports = express.Router();

router.param('project', controller.param);

router.route('/projects')
  .get(controller.list)
  .post(controller.create);

router.route('/projects/:project')
  .get(controller.detail)
  .put(controller.update)
  .delete(controller.remove);
