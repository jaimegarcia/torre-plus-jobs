const express = require('express')
const controllers = require('./controllers')

const router = express.Router();

router.post('/',controllers.postOpportunities);
router.get('/:id',controllers.getOpportunity);
exports.router =  router;