const Joi = require('joi');

module.exports = Joi.object({
    type: Joi.string()
        .alphanum()
        .min(2)
        .max(30),
    user_id: Joi.number(),
}).min(1).required();
