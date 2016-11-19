const models = require('../models');

class Developer {
  static param(req, res, next) {
    models.developer.findById(req.params.developer, {
      include: [models.skill]
    })
      .then(developer => {
        if (!developer) {
          const err = new Error('Developer Not Found');
          err.status = 404;
          return next(err);
        }
        req.developer = developer;
        return next();
      });
  }

  static list(req, res, next) {
    models.developer.findAll({
      include: [models.skill]
    })
      .then(res.json.bind(res))
      .catch(next);
  }

  static create(req, res, next) {
    models.developer
      .build(req.body)
      .save()
      .then(res.json.bind(res))
      .catch(next);
  }

  static detail(req, res) {
    return res.json(req.developer);
  }

  static update(req, res, next) {
    return req.developer
      .update(req.body)
      .then(res.json.bind(res))
      .catch(next);
  }

  static remove(req, res, next) {
    return req.developer
      .destroy()
      .then(res.json.bind(res, 200))
      .catch(next);
  }
}
module.exports = Developer;
