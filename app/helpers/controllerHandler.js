/**
 * Controller wrapper to manage errors
 * @param {object} controller a controller to execute iside a try… catch… block
 * @returns a controller as middleware function
 */
module.exports = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (err) {
        // Express va considérer que l'on fourni en argument une erreur, et va rajouter en arguments
        // supplémentaires request, response, next (dans cette ordre)

        // Le prochains middleware à être exécuté sera le premier ayant 4 paramètres définis
        next(err);
    }
};
