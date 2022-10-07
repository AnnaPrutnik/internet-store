const Router = require('express');
const { body, param, check } = require('express-validator');
const brandController = require('../controllers/brandController');
const checkId = require('../middlewares/checkId-middleware');
const checkRole = require('../middlewares/check-role-middleware');
const role = require('../config/roles');

const router = new Router();

router.post('/', [checkRole(role.ADMIN)], brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', [checkId, check('id').isInt()], brandController.getSingle);
router.delete(
  '/:id',
  [checkRole(role.ADMIN), checkId, param('id').isInt()],
  brandController.delete
);

module.exports = router;
