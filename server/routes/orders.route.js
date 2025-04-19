const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller.js')
const authorize = require('../middlewares/authorize.js')

router.get('/stats',authorize,ordersController.getOrderDetails)


module.exports = router;