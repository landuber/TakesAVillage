var express = require('express')
var passport = require('passport');

require('../config/passport')(passport);

var router = express.Router();
var villagers = require('./api/villagers.route');

router.use('/villagers', villagers);

module.exports = router;
