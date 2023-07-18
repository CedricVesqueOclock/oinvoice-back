const express = require('express');

const { clientController: controller } = require('../controllers/client');
const controllerHandler = require('../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
/**
 * GET /api/client
 * @summary Get all client
 * @tags client
 * @return {[client]} 200 - success response - application/json
 * @return {Error} 500 - Internal Server Error - application/json
 */
    .get(controllerHandler(controller.getAll));

module.exports = router;
