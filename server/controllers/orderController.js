const { Basket, Product, BasketItem, Order, order_product, User } = require('../models/models');

const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const secret_key = 'bcrypt-secret-key';
const { where, Op } = require("sequelize");

class orderController {

    async createOrder(req, res, next) {
        const { paymentMethod, orderStatus, basketId, userId, addresshopId } = req.body;
        
        // Находим корзину по basketId
        const basket = await Basket.findByPk(basketId);
        
        // Создаем заказ
        const order = await Order.create({
            amount: basket.totalPrice,
            paymentMethod,
            orderStatus: "Оформлен",
            basketId,
            userId,
            addresshopId,
            orderDate: 2024, // Устанавливаем текущую дату и время
        });
    
        // Получаем все товары из корзины
        const basketItems = await BasketItem.findAll({
            where: {
                basketId: basketId,
            },
        });
    
        // Добавляем каждый товар из корзины к заказу
        for (const item of basketItems) {
            await order_product.create({
                orderId: order.id,
                productId: item.productId
            });
        }
    
        res.status(201).json({
            success: true,
            order,

        });
    }
    
    
    
    

    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: Product,
                        as: 'products', // Alias for products associated with the order
                        
                    }
                ]
            });
            
            return res.json(orders);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка при получении заказов' }); 
        }
    }

    async getUserOrders(req, res) {
        try {
            const {id} = req.body; // Get userId from request parameters

            // Fetch user to ensure they exist
            const user = await User.findByPk(id);
            if (!user) {
              return res.status(404).json({ message: 'Пользователь не найден' });
            }
      
            const orders = await Order.findAll({
              where: { userId: id },  // Filter orders by userId
              include: [
                {
                  model: Product,
                  as: 'products'
                  }
                
              ]
            });
      
            return res.json(orders);
          } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка при получении заказов' });
          }
    }
}


module.exports = new orderController()