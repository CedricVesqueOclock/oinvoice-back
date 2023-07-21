const Joi = require('joi');

module.exports = Joi.object({
    mail: Joi.string()
        .pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    siret: Joi.string()
        .pattern(/^\d{9}$/),
    siren: Joi.string()
        .pattern(/^\d{14}$/),
    name: Joi.string()
        .min(2)
        .max(30),
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
}).min(1);
