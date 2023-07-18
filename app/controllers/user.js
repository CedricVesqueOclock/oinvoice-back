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
        const users = await userDataMapper.findAll();
        return res.json(users);
    },

    async getOne(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);

        if (!user) {
            throw new Error('User not found', { statusCode: 404 });
        }

        return res.json(user);
    },
};
