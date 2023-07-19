const userDataMapper = require('../datamapper/user');
// const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    async getAll(_, res) {
        const allUser = await userDataMapper.findAll();
        return res.json(allUser);
    },

    async getOne(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);

        if (!user) {
            throw new Error('user not found', { statusCode: 404 });
        }

        return res.json(user);
    },

    async create(req, res) {
        const savedUser = await userDataMapper.insert(req.body);
        return res.json(savedUser);
    },

    async modify(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);
        if (!user) {
            throw new Error('This user does not exists', { statusCode: 404 });
        }

        const savedUser = await userDataMapper.update(req.params.id, req.body);
        return res.json(savedUser);
    },

    // async delete(req, res) {
    //     const deleted = await userDataMapper.delete(req.params.id);

    //     if (!deleted) {
    //         throw new Error('This user does not exists', { statusCode: 404 });
    //     } else {
    //         console.log(`Current user was delete ${req.params.id}`, { statusCode: 200 });
    //     }
    //     // No Content
    //     return res.status(204).json();
    // },
};
