const Router = require('express');
const deviceController = require('../controllers/deviceController');
const checkId = require('../middlewares/checkId-middleware');

const router = new Router();

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', [checkId], deviceController.getSingle);
router.delete('/:id', [checkId], deviceController.delete);

module.exports = router;
