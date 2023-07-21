const clientDataMapper = require('../datamapper/client');
// const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    async getAll(_, res) {
        const allClient = await clientDataMapper.findAll();
        return res.json(allClient);
    },

    async getOne(req, res) {
        const client = await clientDataMapper.findByPk(req.params.id);

        if (!client) {
            throw new Error('client not found', { statusCode: 404 });
        }

        return res.json(client);
    },

    async create(req, res) {
        const savedClient = await clientDataMapper.insert(req.body);
        return res.json(savedClient);
    },

    async modify(req, res) {
        const client = await clientDataMapper.findByPk(req.params.id);
        if (!client) {
            throw new Error('This client does not exists', { statusCode: 404 });
        }

        const savedClient = await clientDataMapper.update(req.params.id, req.body);
        return res.json(savedClient);
    },

    async delete(req, res) {
        const deleted = await clientDataMapper.delete(req.params.id);

        if (!deleted) {
            throw new Error('This client does not exists', { statusCode: 404 });
        }
        // No Content
        return res.status(204).json();
    },
};
