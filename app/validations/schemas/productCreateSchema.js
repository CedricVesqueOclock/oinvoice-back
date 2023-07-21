const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),
    description: Joi.string()
        .max(3000),
    category: Joi.string()
        .min(1)
        .max(20)
        .required(),
    price_ht: Joi.number()
        .precision(2)
        .greater(0)
        .required(),
    rate: Joi.number()
        .integer()
        .greater(0)
        .required(),
    user_id: Joi.number(),
});
