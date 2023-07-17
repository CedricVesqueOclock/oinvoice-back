const express = require('express');

const userRouter = require('./user');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.all('/', apiController.home);

// On préfixe les routers de l'API
router.use('/user', userRouter);

router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;