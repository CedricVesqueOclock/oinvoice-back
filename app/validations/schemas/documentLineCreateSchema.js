const Joi = require('joi');

module.exports = Joi.object({
    price: Joi.number()
        .required(),
    quantity: Joi.number()
        .min(1)
        .required(),
    document_id: Joi.number(),
    client_id: Joi.number(),
    product_id: Joi.number(),
});
