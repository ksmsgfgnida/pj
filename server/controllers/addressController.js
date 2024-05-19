const { AddressShop } = require('../models/models');

class AddressShopController {
  async createAddressShop(req, res, next) {
    try {
      const { city, street, house } = req.body;

      // Создаем новый адрес магазина
      const addressShop = await AddressShop.create({
        city,
        street,
        house,
      });

      res.status(201).json({
        success: true,
        addressShop,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAddressShops(req, res, next) {
    try {
      // Получаем все адреса магазинов
      const addressShops = await AddressShop.findAll();

      res.status(200).json(
        addressShops);
    } catch (error) {
      next(error);
    }
  }

  async getAddressShopById(req, res, next) {
    try {
      const { id } = req.params;

      // Находим адрес магазина по id
      const addressShop = await AddressShop.findByPk(id);

      if (!addressShop) {
        return res.status(404).json({
          success: false,
          message: 'Адрес магазина не найден',
        });
      }

      res.status(200).json(
        addressShop);
    } catch (error) {
      next(error);
    }
  }

  async updateAddressShop(req, res, next) {
    try {
      const { id } = req.params;
      const { city, street, house } = req.body;

      // Находим адрес магазина по id и обновляем его
      const [updatedRowsCount, [updatedAddressShop]] = await AddressShop.update(
        {
          city,
          street,
          house,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (updatedRowsCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Адрес магазина не найден',
        });
      }

      res.status(200).json({
        success: true,
        addressShop: updatedAddressShop,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAddressShop(req, res, next) {
    try {
      const { id } = req.params;

      // Находим адрес магазина по id и удаляем его
      const deletedRowsCount = await AddressShop.destroy({
        where: { id },
      });

      if (deletedRowsCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Адрес магазина не найден',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Адрес магазина успешно удален',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AddressShopController();
