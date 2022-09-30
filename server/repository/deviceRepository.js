const { Device, DeviceInfo } = require('../models/models');

class DeviceRepository {
  async getAll(limit, offset) {
    const devices = await Device.findAndCountAll({ limit, offset });
    return devices;
  }

  async getAllByBrand(limit, offset, brandId) {
    const devices = await Device.findAndCountAll({
      where: { brandId },
      limit,
      offset,
    });
    return devices;
  }

  async getAllByType(limit, offset, typeId) {
    const devices = await Device.findAndCountAll({
      where: { typeId },
      limit,
      offset,
    });
    return devices;
  }

  async getAllByTypeAndBrand(limit, offset, brandId, typeId) {
    const devices = await Device.findAndCountAll({
      where: { brandId, typeId },
      limit,
      offset,
    });
    return devices;
  }

  async createDeviceInfo(title, description, deviceId) {
    DeviceInfo.create({ title, description, deviceId });
  }

  async getSingle(id) {
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return device;
  }

  async create(body) {
    const device = await Device.create(body);
    return device;
  }

  async delete(id) {
    const result = await Device.destroy({ where: { id } });
    return result;
  }
}

module.exports = new DeviceRepository();
