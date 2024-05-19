const uuid = require('uuid');
const path = require('path');

const {Product} = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            const {name, price, volume, availability, categoryId, description, top_notes, bottom_notes} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) //перемещение файла в папку статик

            const product = await Product.create({name, price, img: fileName, volume, availability, categoryId, description, top_notes, bottom_notes})

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res) {
        let {categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit //это лимит сколько будет товаров отображено
        let products;
        if (!categoryId){
            products =  await Product.findAndCountAll({limit, offset})
        }
        if (categoryId) {
            products =  await Product.findAndCountAll({where: {categoryId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req,res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id}
            }
        )
        return res.json(product)
    }
}

module.exports = new ProductController()