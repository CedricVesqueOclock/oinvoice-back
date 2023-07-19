const productDataMapper = require('../datamapper/product');
// const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    async getAll(_, res) {
        const allProduct = await productDataMapper.findAll();
        return res.json(allProduct);
    },

    async getOne(req, res) {
        const product = await productDataMapper.findByPk(req.params.id);

        if (!product) {
            throw new Error('product not found', { statusCode: 404 });
        }

        return res.json(product);
    },

    async create(req, res) {
        const savedProduct = await productDataMapper.insert(req.body);
        return res.json(savedProduct);
    },

    async modify(req, res) {
        const product = await productDataMapper.findByPk(req.params.id);
        if (!product) {
            throw new Error('This product does not exists', { statusCode: 404 });
        }

        const savedProduct = await productDataMapper.update(req.params.id, req.body);
        return res.json(savedProduct);
    },
    async delete(req, res) {
        const deleted = await productDataMapper.delete(req.params.id);

        if (!deleted) {
            throw new Error('This product does not exists', { statusCode: 404 });
        }
        // No Content
        return res.status(204).json();
    },
};
