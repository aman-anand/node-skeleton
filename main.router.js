const router = require('express').Router();
let apiPrefix = '/api'
let endpoint = "/lola"
router.use(apiPrefix + endpoint + "/about", require('./api/routes/about.route'))

module.exports = router;
