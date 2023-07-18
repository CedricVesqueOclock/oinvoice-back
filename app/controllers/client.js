const clientDataMapper = require('../datamapper/client');
// const { ApiError } = require('../helpers/errorHandler');

module.exports = {
    /**
     * client controller to get all records.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getAll(_, res) {
        const clients = await clientDataMapper.findAll();
        return res.json(clients);
    },
};
