const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller.js')
const authorize = require('../middlewares/authorize.js')

router.post('/orders',authorize,ordersController.createOrder)

router.get('/stats',authorize,ordersController.getOrderDetails)

router.get('/orders',authorize,ordersController.getAllOrders)

router.get('/orders/:orderId',authorize,ordersController.getOrderDetailsById)

router.put('/orders/:orderId',authorize,ordersController.updateOrderStatus)


module.exports = router;