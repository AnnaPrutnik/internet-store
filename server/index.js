const express = require('express');
require('dotenv').config();
const path = require('path');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/error-middleware');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 7000;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

//Last middleware!!!
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
