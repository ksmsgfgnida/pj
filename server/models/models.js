const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING,},
    role: {type: DataTypes.STRING, defaultValue:"USER"},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    totalPrice: {type: DataTypes.DECIMAL}
})

const BasketItem = sequelize.define('BasketItem', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  quantity: {type: DataTypes.INTEGER, defaultValue: 1},
  QPrice: {type: DataTypes.INTEGER,}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const AddressShop= sequelize.define('addresshop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {type: DataTypes.STRING, allowNull: false},
    street: {type: DataTypes.STRING, allowNull: false},
    house: {type: DataTypes.STRING, allowNull: false},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {//сумма
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM('Банковская карта', 'Наличные (рубли)'),
        allowNull: false},
      orderStatus: {
        type: DataTypes.ENUM('Оформлен', 'Готов к выдачи', 'Получен'),
        allowNull: false},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      volume: {
        type: DataTypes.ENUM('10', '30', '50'),
        allowNull: false,
      },
      availability: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {type: DataTypes.STRING, allowNull: false},
      top_notes: {type: DataTypes.STRING, allowNull: false},
      bottom_notes: {type: DataTypes.STRING, allowNull: false},
})


// const products_basket = sequelize.define('products_basket', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

const order_product = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

// Описание ассоциации многие ко многим между таблицей "Заказ" и таблицей "Товар"
Order.belongsToMany(Product, { through: order_product });
Product.belongsToMany(Order, { through: order_product });

// Описание ассоциации один к многим между таблицей "Категория" и таблицей "Товар"
Category.hasMany(Product);
Product.belongsTo(Category);

// // Описание ассоциации многие ко многим между таблицей "Товар" и таблицей "Корзина" через промежуточную таблицу "Товары_в_Корзине"
// Product.belongsToMany(Basket, { through: products_basket });
// Basket.belongsToMany(Product, { through: products_basket });

Product.hasMany(BasketItem);
BasketItem.belongsTo(Product);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

// Описание ассоциации один ко многим между таблицей "Заказ" и таблицей "АдресМагазина"
Order.belongsTo(AddressShop);
AddressShop.hasMany(Order);

Basket.hasMany(Order); // одна корзина содержит много заказов
Order.belongsTo(Basket); // каждый заказ принадлежит одной корзине

module.exports = {
    User,
    Basket,
    BasketItem,
    Product, 
    Category, 
    Order,
    AddressShop,
    order_product,
    
}