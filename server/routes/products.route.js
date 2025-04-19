const express = require('express');
const productsController = require('../controllers/products.controller.js')
const authorize = require('../middlewares/authorize.js')
const router = express.Router();


router.post('/products',authorize,productsController.addProducts)

router.get('/products',authorize,productsController.getProducts)

router.put('/products/:id',authorize,productsController.updateProducts)

router.delete('/products/:id',authorize,productsController.deleteProducts)

module.exports = router