const payments = require('./payments/router');
const mentors = require('./mentors/router');
module.exports = {
  paymentsRouter: payments.router,
  mentorsRouter: mentors.router,
}