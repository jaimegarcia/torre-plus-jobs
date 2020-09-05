const payments = require('./payments/router');
const mentors = require('./mentors/router');
const opportunities = require('./opportunities/router');

module.exports = {
  paymentsRouter: payments.router,
  mentorsRouter: mentors.router,
  opportunitiesRouter: opportunities.router,
}