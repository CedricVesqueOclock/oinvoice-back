const express = require('express');

const controller = require('../controllers/document');
const controllerHandler = require('../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    .get(controllerHandler(controller.getAll))
    .post(controllerHandler(controller.create));

router
    .route('/:id(\\d+)')
    .get(controllerHandler(controller.getOne))
    .patch(controllerHandler(controller.modify))
    .delete(controllerHandler(controller.delete));

module.exports = router;
