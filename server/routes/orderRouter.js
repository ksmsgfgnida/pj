const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, orderController.createOrder)
// router.delete('/', authMiddleware,basketController.delete)

router.get("/", authMiddleware, orderController.getAllOrders);

router.get("/", authMiddleware, orderController.getUserOrders);

module.exports = router