const documentDataMapper = require('../datamapper/document');
// const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    async getAll(_, res) {
        const allDocument = await documentDataMapper.findAll();
        return res.json(allDocument);
    },

    async getOne(req, res) {
        const document = await documentDataMapper.findByPk(req.params.id);

        if (!document) {
            throw new Error('document not found', { statusCode: 404 });
        }

        return res.json(document);
    },

    async create(req, res) {
        const savedDocument = await documentDataMapper.insert(req.body);
        return res.json(savedDocument);
    },

    async modify(req, res) {
        const document = await documentDataMapper.findByPk(req.params.id);
        if (!document) {
            throw new Error('This document does not exists', { statusCode: 404 });
        }

        const saveDdocument = await documentDataMapper.update(req.params.id, req.body);
        return res.json(saveDdocument);
    },
};
