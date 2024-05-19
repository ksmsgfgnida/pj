const Router = require('express')
const router = new Router()
const ApiError = require('../error/ApiError');


const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')
const addressRouter = require('./addressRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/address', addressRouter)

module.exports = router