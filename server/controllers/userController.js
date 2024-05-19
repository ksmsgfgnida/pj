const secret_key = 'bcrypt-secret-key';

const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, secret_key, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль!'))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) //хеширование пароля, 5-сколько раз
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req,res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req,res,next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getUserData(req, res, next) {
        try {
            // Извлекаем идентификатор пользователя из тела запроса
            const userId = parseInt(req.query.userId); // Предполагается, что идентификатор пользователя передается в теле запроса как свойство userId
    
            // Находим пользователя в базе данных по идентификатору
            const user = await User.findByPk(userId);
    
            // Если пользователь не найден, генерируем ошибку
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
    
            // Возвращаем данные пользователя
            return res.json(user);
        } catch (e) {
            return next(e); // Передаем ошибку обработчику ошибок
        }
    }
    
    
}

module.exports = new UserController()