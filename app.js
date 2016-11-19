const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/customer'));
app.use(require('./routes/developer'));
app.use(require('./routes/project'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .end(err.message);
  // .json('error', {
  //   message: err.message,
  //   error: err
  // });
});

module.exports = app;

app.listen(config.app.port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is started on port: ${config.app.port}`);
});
