const express = require('express');

const userRouter = require('./user');
const clientRouter = require('./client');
const productRouter = require('./product');
const documentRouter = require('./document');
const documentLineRouter = require('./documentLine');

const { apiController } = require('../controllers/index');
// const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.all('/', apiController.home);

// On préfixe les routers de l'API
router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/product', productRouter);
router.use('/document', documentRouter);
router.use('/documentline', documentLineRouter);

router.use(() => {
    throw new Error('API Route not found', { statusCode: 404 });
});

module.exports = router;
