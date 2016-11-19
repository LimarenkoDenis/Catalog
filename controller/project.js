const models = require('../models');

class Project {
  static param(req, res, next) {
    models.project.findById(req.params.project, {
      // include: [models.developer, models.customer]
    })
    .then(project => {
      if (!project) {
        const err = new Error('Project Not Found');
        err.status = 404;
        return next(err);
      }
      req.project = project;
      return next();
    });
  }

  static list(req, res, next) {
    models.project.findAll({
      // include: [models.developer, models.customer]
    })
    .then(res.json.bind(res))
    .catch(next);
  }

  static create(req, res, next) {
    models.project
      .build(req.body)
      .save()
      .then(res.json.bind(res))
      .catch(next);
  }

  static detail(req, res) {
    return res.json(req.project);
  }

  static update(req, res, next) {
    return req.project
      .update(req.body)
      .then(res.json.bind(res))
      .catch(next);
  }

  static remove(req, res, next) {
    return req.project
      .destroy()
      .then(res.json.bind(res, 200))
      .catch(next);
  }
}
module.exports = Project;
