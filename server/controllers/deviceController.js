const path = require('path');
const deviceRepository = require('../repository/deviceRepository');
const ApiError = require('../errors/ApiError');
const messages = require('../config/messages');
const { v4: uuidv4 } = require('uuid');

class DeviceController {
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = page || 9;
    let offset = page * limit - limit;

    let devices;
    if (!brandId && !typeId) {
      devices = await deviceRepository.getAll(limit, offset);
    }
    if (brandId && !typeId) {
      devices = await deviceRepository.getAllByBrand(limit, offset, brandId);
    }
    if (!brandId && typeId) {
      devices = await deviceRepository.getAllByType(limit, offset, typeId);
    }
    if (brandId && typeId) {
      devices = await deviceRepository.getAllByTypeAndBrand(
        limit,
        offset,
        brandId,
        typeId
      );
    }
    res
      .status(200)
      .json({ status: 200, message: messages.successResponse, data: devices });
  }

  async getSingle(req, res) {
    const { id } = req.params;
    const device = await deviceRepository.getSingle(id);
    res
      .status(200)
      .json({ status: 200, message: messages.successResponse, data: device });
  }

  async create(req, res, next) {
    const { name, price, brandId, typeId, info } = req.body;
    const { img } = req.files;

    if (!img || Object.keys(req.files).length === 0) {
      return res.status(400).send(messages.noImages);
    }

    try {
      let fileName = uuidv4() + '.jpg';
      let pathName = path.resolve(__dirname, '..', 'static', fileName);
      img.mv(pathName, function (err) {
        if (err) return res.status(500).send(err);
      });
      const newDevice = { name, price, brandId, typeId, img: fileName };
      const device = await deviceRepository.create(newDevice);
      if (info) {
        let infoDevice = JSON.parse(info);
        infoDevice.forEach(({ title, description }) =>
          deviceRepository.createDeviceInfo(title, description, device.id)
        );
      }
      res
        .status(200)
        .json({ status: 201, message: messages.successResponse, data: device });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const result = await deviceRepository.delete(id);
    if (result === 1) {
      return res
        .status(200)
        .json({ status: 200, message: messages.successResponse });
    }
    return res
      .status(400)
      .json({ status: 400, message: messages.noItem });
  }
}

module.exports = new DeviceController();
