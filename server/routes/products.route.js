const express = require('express');
const productsController = require('../controllers/products.controller.js')
const authorize = require('../middlewares/authorize.js')
const router = express.Router();



router.post('/products',authorize,productsController.addProducts)


module.exports = router