const Router = require('express');
const typeController = require('../controllers/typeController');
const checkId = require('../middlewares/checkId-middleware');

const router = new Router();

router.post('/', typeController.create);
router.get('/', typeController.getAll);
router.get('/:id', [checkId], typeController.getSingle);
router.delete('/:id', [checkId], typeController.delete);

module.exports = router;
