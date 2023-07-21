const debug = require('debug')('app:validator');

module.exports = (prop, schema) => async (request, _, next) => {
    try {
        // la "value" on s'en fiche on la récupère pas
        // request['body'] == request.body
        debug(request[prop]);
        await schema.validateAsync(request[prop]);
        next();
    } catch (error) {
        // Je dois afficher l'erreur à l'utilisateur
        // STATUS HTTP pour une erreur de saise : 400
        // On réabille l'erreur en suivant notre propre normalisation
        next(new Error(error.details[0].message, { statusCode: 400 }));
    }
};
