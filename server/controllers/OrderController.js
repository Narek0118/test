const { Order } = require("../models/models");

class OrderController {
  async create(req, res) {
    console.log(1111111, req.body);
    const { userId, price, deviceIds } = req.body;
    const order = await Order.create({ userId, price });
    console.log(555234324324, order);
    res.json(req.body);
  }

  async getAll(req, res) {
    const types = await Order.findAll();
    res.json(types);
  }
}

module.exports = new OrderController();
