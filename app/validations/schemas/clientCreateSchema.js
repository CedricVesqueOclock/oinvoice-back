const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    lastname: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    siret: Joi.string()
        .pattern(/^\d{9}$/)
        .allow(null),
    siren: Joi.string()
        .pattern(/^\d{14}$/)
        .allow(null),
    mail: Joi.string()
        .pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .required(),
    adress: Joi.string()
        .min(3)
        .max(30),
    zip_code: Joi.string()
        .pattern(/^\d{5}$/),
    city: Joi.string()
        .min(2)
        .max(30),
    number: Joi.string()
        .pattern(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/),
    user_id: Joi.number(),
}).required();
