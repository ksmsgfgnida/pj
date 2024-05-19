const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    DB_NAME = 'perfume', // название бд
    DB_USER = 'postgres', // пользователь
    DB_PASSWORD = 'rr.kkseung11o3', // пароль от бд
    {
        dialect: 'postgres',
        host: 'localhost',
        port: '5432'
    }
)