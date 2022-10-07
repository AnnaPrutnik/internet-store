const Router = require('express');
const typeController = require('../controllers/typeController');
const checkId = require('../middlewares/checkId-middleware');
const checkRole = require('../middlewares/check-role-middleware');
const { check } = require('express-validator');
const role = require('../config/roles');

const router = new Router();

router.post('/', [checkRole(role.ADMIN)], typeController.create);
router.get('/', typeController.getAll);
router.get('/:id', [checkId, check('id').isInt()], typeController.getSingle);
router.delete(
  '/:id',
  [checkRole(role.ADMIN), checkId, check('id').isInt()],
  typeController.delete
);

module.exports = router;
