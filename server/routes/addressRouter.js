const Router = require('express')
const router = new Router()
const addressController = require('../controllers/addressController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, addressController.createAddressShop)
// router.delete('/', authMiddleware,basketController.delete)

router.get("/", authMiddleware, addressController.getAddressShops);

// router.get("/:id", authMiddleware, orderController.getUserOrders);

module.exports = router