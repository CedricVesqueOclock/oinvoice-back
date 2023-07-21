const express = require('express');

const validate = require('../validations/validator');
const createSchema = require('../validations/schemas/productUpdateSchema');
const updateSchema = require('../validations/schemas/productUpdateSchema');

const controller = require('../controllers/product');
const controllerHandler = require('../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    .get(controllerHandler(controller.getAll))
    .post(validate('body', createSchema), controllerHandler(controller.create));

router
    .route('/:id(\\d+)')
    .get(controllerHandler(controller.getOne))
    .patch(validate('body', updateSchema), controllerHandler(controller.modify))
    .delete(controllerHandler(controller.delete));

module.exports = router;
