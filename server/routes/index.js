const Router = require('express');
const authRouter = require('./authRouter');
const deviceRouter = require('./deviceRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);

module.exports = router;
