const Router = require('express');
const { check } = require('express-validator');
const deviceController = require('../controllers/deviceController');
const checkId = require('../middlewares/checkId-middleware');
const checkRole = require('../middlewares/check-role-middleware');
const role = require('../config/roles');

const router = new Router();

router.post('/', [checkRole(role.ADMIN)], deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', [checkId, check('id').isInt()], deviceController.getSingle);
router.delete(
  '/:id',
  [checkRole(role.ADMIN), checkId, check('id').isInt()],
  deviceController.delete
);

module.exports = router;
