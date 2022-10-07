const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.get('/', [authMiddleware], userController.getUsers);

module.exports = router;
