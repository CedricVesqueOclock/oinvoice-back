const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30),
    description: Joi.string()
        .max(3000),
    category: Joi.string()
        .min(1)
        .max(20),
    price_ht: Joi.number()
        .precision(2)
        .greater(0),
    rate: Joi.number()
        .precision(2)
        .greater(0),
    user_id: Joi.number(),
}).min(1);
