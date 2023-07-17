const express = require('express');

const { userController: controller } = require('../controllers/user');
const controllerHandler = require('../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
/**
 * GET /api/user
 * @summary Get all user
 * @tags User
 * @return {[User]} 200 - success response - application/json
 * @return {Error} 500 - Internal Server Error - application/json
 */
    .get(controllerHandler(controller.getAll));
// /**
//  * POST /api/user
//  * @summary Create a user
//  * @tags User
//  * @param {InputUser} request.body.required - user info
//  * @return {User} 200 - success response - application/json
//  * @return {ApiError} 400 - Bad request response - application/json
//  * @return {ApiError} 404 - User not found - application/json
//  * @return {Error} 500 - Internal Server Error - application/json
//  */
//     .post(validate('body', createSchema), controllerHandler(controller.create));

// router
//     .route('/:id(\\d+)')
// /**
//  * GET /api/user/{id}
//  * @summary Get one user
//  * @tags User
//  * @param {number} id.path.required - user identifier
//  * @return {User} 200 - success response - application/json
//  * @return {ApiError} 400 - Bad request response - application/json
//  * @return {ApiError} 404 - user not found - application/json
//  * @return {Error} 500 - Internal Server Error - application/json
//  */
//     .get(controllerHandler(controller.getOne))
// /**
//  * PATCH /api/user/{id}
//  * @summary Update one user
//  * @tags User
//  * @param {number} id.path.required - user identifier
//  * @param {Inputuser} request.body.required - user info
//  * @return {User} 200 - success response - application/json
//  * @return {ApiError} 400 - Bad request response - application/json
//  * @return {ApiError} 404 - user not found - application/json
//  * @return {Error} 500 - Internal Server Error - application/json
//  */
//     .patch(validate('body', updateSchema), controllerHandler(controller.update))
// /**
//  * DELETE /api/user/{id}
//  * @summary Delete one user
//  * @tags User
//  * @param {number} id.path.required - user identifier
//  * @return {User} 200 - success response - application/json
//  * @return {ApiError} 400 - Bad request response - application/json
//  * @return {ApiError} 404 - user not found - application/json
//  * @return {Error} 500 - Internal Server Error - application/json
//  */
//     .delete(controllerHandler(controller.delete));

module.exports = router;
