const models = require('../models');

class Customer {
  static param(req, res, next) {
    models.customer.findById(req.params.customer, {
      // include: [models.project]
    })
    .then(customer => {
      if (!customer) {
        const err = new Error('Customer Not Found');
        err.status = 404;
        return next(err);
      }
      req.customer = customer;
      return next();
    });
  }

  static list(req, res, next) {
    models.customer.findAll({
      // include: [models.project]
    })
    .then(res.json.bind(res))
    .catch(next);
  }

  static create(req, res, next) {
    models.customer
      .build(req.body)
      .save()
      .then(res.json.bind(res))
      .catch(next);
  }

  static detail(req, res) {
    return res.json(req.customer);
  }

  static update(req, res, next) {
    return req.customer
      .update(req.body)
      .then(res.json.bind(res))
      .catch(next);
  }

  static remove(req, res, next) {
    return req.customer
      .destroy()
      .then(res.json.bind(res, 200))
      .catch(next);
  }
}
module.exports = Customer;
