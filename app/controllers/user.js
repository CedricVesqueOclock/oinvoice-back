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
        const user = await userDataMapper.isUnique(req.body);

        // Si existe déjà
        if (user) {
            let field;
            if (user.label === req.body.label) {
                field = 'label';
            } else {
                field = 'slug';
            }
            throw new Error(`user already exists with this ${field}`, { statusCode: 400 });
        }

        const savedUser = await userDataMapper.insert(req.body);
        // Si pas de status préciser c'est status 200 par défaut
        return res.json(savedUser);
    },

    async update(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);
        if (!user) {
            throw new Error('This user does not exists', { statusCode: 404 });
        }

        const existinguser = await userDataMapper.isUnique(req.body, req.params.id);
        if (existinguser) {
            let field;
            if (existinguser.label === req.body.label) {
                field = 'label';
            } else {
                field = 'slug';
            }
            throw new Error(`Other user already exists with this ${field}`, {
                statusCode: 400,
            });
        }

        const saveduser = await userDataMapper.update(req.params.id, req.body);
        return res.json(saveduser);
    },

    async delete(req, res) {
        const deleted = await userDataMapper.delete(req.params.id);
        if (!deleted) {
            throw new Error('This user does not exists', { statusCode: 404 });
        }
        // No Content
        return res.status(204).json();
    },
};
