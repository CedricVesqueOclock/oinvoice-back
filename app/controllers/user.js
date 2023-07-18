const userDataMapper = require('../datamapper/user');
// const { ApiError } = require('../helpers/errorHandler');

module.exports = {
    /**
     * User controller to get all records.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async getAll(_, res) {
        const categories = await userDataMapper.findAll();
        return res.json(categories);
    },
};
