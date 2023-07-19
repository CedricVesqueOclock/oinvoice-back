const documentLineDataMapper = require('../datamapper/documentLine');
// const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    async getAll(_, res) {
        const alldocumentLine = await documentLineDataMapper.findAll();
        return res.json(alldocumentLine);
    },

    async getOne(req, res) {
        const documentLine = await documentLineDataMapper.findByPk(req.params.id);

        if (!documentLine) {
            throw new Error('documentLine not found', { statusCode: 404 });
        }

        return res.json(documentLine);
    },

    async create(req, res) {
        const savedDocumentLine = await documentLineDataMapper.insert(req.body);
        return res.json(savedDocumentLine);
    },

    async modify(req, res) {
        const documentLine = await documentLineDataMapper.findByPk(req.params.id);
        if (!documentLine) {
            throw new Error('This documentLine does not exists', { statusCode: 404 });
        }

        const savedDocumentLine = await documentLineDataMapper.update(req.params.id, req.body);
        return res.json(savedDocumentLine);
    },
};
