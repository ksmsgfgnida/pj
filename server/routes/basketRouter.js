const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

// const checkRole = require('../middleware/checkRoleMiddleware')

// router.post('/',  basketController.create)
// router.get("/", basketController.getAll);
// router.get("/:id", basketController.getOne);
// router.delete("/", basketController.deleteItem);

// router.post('/', basketController.addToBasket)
// router.get('/:id', basketController.getBasket)
// router.delete('/:id', basketController.deleteFromBasket)

// router.post('/add-to-cart/', authMiddleware, basketController.create);
router.post('/', authMiddleware,basketController.create)
router.delete('/', authMiddleware,basketController.delete)
// router.get('/', authMiddleware, basketController.get)

router.get("/:id", basketController.get);
router.get("/", basketController.getTotalPrice);

// router.get('/:id', authMiddleware,basketController.getOne)

module.exports = router