const { Basket, Product, BasketItem } = require('../models/models');

const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const secret_key = 'bcrypt-secret-key';
const { where, Op } = require("sequelize");

class basketController {
   
    // async create(req, res) {
    //     const { productId } = req.body;
    //     const { userId } = req.body;
    //     const { quantity } = req.body;
    //     const { QPrice } = req.body;
    //     console.log(QPrice,"----------1")
    //     const basket = await Basket.findOne({ where: { userId: userId } });
        
    //     if (!basket) {
    //         return res.json(ApiError.badRequest('Корзина не найдена'));
    //     }
        
    //     const basketItem = await BasketItem.findOne({
    //         where: {
    //             basketId: basket.id,
    //             productId: productId
    //         }
    //     });
        
    //     if (!basketItem) {
    //         const newBasketProduct = await new BasketItem({
    //             basketId: basket.id,
    //             productId: productId,
    //             quantity: 1,
    //             QPrice: QPrice
    //         }).save();
    //         console.log(QPrice,"-----------")
    //         return res.json(newBasketProduct);
    //     } else {
    //         // Update the quantity and Qprice
    //         basketItem.quantity = quantity;
    //         basketItem.QPrice = quantity * QPrice;
    //         await basketItem.save();
            
    //         return res.json(basketItem);
    //     }
    // }

    async create(req, res) {
        const { productId, userId, quantity, QPrice } = req.body;
    
        const basket = await Basket.findOne({ where: { userId: userId } });
    
        if (!basket) {
            return res.json(ApiError.badRequest('Корзина не найдена'));
        }
    
        let basketItem = await BasketItem.findOne({
            where: {
                basketId: basket.id,
                productId: productId
            }
        });
    
        if (!basketItem) {
            // Создаем новый элемент корзины
            basketItem = await new BasketItem({
                basketId: basket.id,
                productId: productId,
                quantity: quantity,
                QPrice: QPrice
            }).save();
        } else {
            // Обновляем количество и общую цену
            basketItem.quantity = quantity;
            basketItem.QPrice = quantity * QPrice;
            await basketItem.save();
        }
    
        // Пересчитываем общую cумм в корзине
        basket.totalPrice = await BasketItem.sum('QPrice', { where: { basketId: basket.id } });
        await basket.save();
    
        return res.json(basketItem);
    }
    

    async delete(req, res) {
        const { userId, productId } = req.query;

        try {
            const basketUser = await Basket.findOne({ where: { userId } });

            if (!basketUser) {
                return next(ApiError.notFound("Корзина пользователя не найдена"));
            }

            const basketItem = await BasketItem.findOne({
                where: { basketId: basketUser.id, productId },
            });

            if (!basketItem) {
                return next(ApiError.notFound("Товар не найден в корзине"));
            }

            await basketItem.destroy(); // Удаляем товар из корзины

            return res.json({ message: "Товар успешно удален из корзины" });
        } catch (error) {
            return next(ApiError.internalServerError("Ошибка при удалении товара из корзины"));
        }
    }

    async get(req, res, next) {
        const { id } = req.params;

        const basketUser = await Basket.findOne({ where: { userId: id } });
        if (!basketUser) {
            return next(ApiError.notFound("Заказ пользователя не найден"));
        }

        const itemsInBasket = await BasketItem.findAll({
            attributes: ["productId", "quantity", "QPrice"], // Выбираем поля productId и quantity
            where: { basketId: basketUser.id },
        });

        let items = [];
        for (let item of itemsInBasket) {
            const product = await Product.findByPk(item.productId);
            if (product) {
                const QPrice = product.price * item.quantity; // Вычисляем QPrice как произведение цены продукта на количество
                items.push({
                    product: product,
                    quantity: item.quantity,
                    QPrice: QPrice,
                    totalPrice: basketUser.totalPrice
                });
            }
        }
        

        return res.json(items);
    }

      
      
    async getTotalPrice(req, res) {
        const { id } = req.body;

        const basketUser = await Basket.findOne({ where: { userId: id } });
        if (!basketUser) {
            return next(ApiError.notFound("Заказ пользователя не найден"));
        }

        const totalPrice = basketUser.totalPrice;
        console.log(totalPrice, "+++++++++++++++")
        // Вернуть полученное значение
        res.json({ totalPrice });

    }
}


module.exports = new basketController()