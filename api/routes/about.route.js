const router = require('express').Router()
const controller = require('../controllers/about.controller')
router.get("/", controller.about)
module.exports = router;
