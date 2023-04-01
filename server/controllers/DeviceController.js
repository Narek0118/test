const path = require("path");
const fs = require("fs");
const ApiError = require("../error/ApiError");
const { Device, DeviceInfo, Rating, User } = require("../models/models");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info, description } = req.body;
      const oldPath = req.file.path;
      const newPath = path.join(__dirname, "uploads", req.file.filename);
      const fileName = `${newPath}${path.extname(req.file.originalname)}`;
      const imageName = oldPath.slice(8) + path.extname(req.file.originalname);
      fs.renameSync(oldPath, fileName);
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        description,
        img: imageName,
      });

      res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        {
          model: Rating,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
      order: [
        [Rating, 'id', 'DESC']
      ]
    });

    res.json(device);
  }

  async getAll(req, res) {
    let { brandId, typeId, page, limit } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      // devices = await Device.findAndCountAll({ limit, offset });
      devices = await Device.findAndCountAll();
    } else if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    } else if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    } else if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }

    res.json(devices);
  }
}

module.exports = new DeviceController();
