const Joi = require('joi');

module.exports = Joi.object({
    type: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    user_id: Joi.number(),
});
