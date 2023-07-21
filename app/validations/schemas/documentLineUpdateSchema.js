const Joi = require('joi');

module.exports = Joi.object({
    price: Joi.number()
        .min(0),
    quantity: Joi.number()
        .min(1),
    document_id: Joi.number(),
    client_id: Joi.number(),
    product_id: Joi.number(),
}).min(1);
