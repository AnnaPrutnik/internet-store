const Router = require('express');
const brandController = require('../controllers/brandController');
const checkId = require('../middlewares/checkId');

const router = new Router();

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', [checkId], brandController.getSingle);
router.delete('/:id', [checkId], brandController.delete);

module.exports = router;
