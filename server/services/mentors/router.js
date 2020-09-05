const express = require('express')
const controllers = require('./controllers')

const router = express.Router();

router.post('/',controllers.postMentors)

exports.router =  router;