const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM "product"');
        return result.rows;
    },

    async findByPk(productId) {
        const result = await client.query('SELECT * FROM "product" WHERE id = $1', [productId]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },
    async insert(product) {
        const savedproduct = await client.query(
            `
                INSERT INTO "product"
                (name, description, category, price_ht, rate, user_id) VALUES
                ($1, $2, $3, $4, $5, $6) RETURNING *
            `,
            [
                product.name,
                product.description,
                product.category,
                product.price_ht,
                product.rate,
                product.user_id,
            ],
        );

        return savedproduct.rows[0];
    },

    async update(id, product) {
        const fields = Object.keys(product).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(product);

        const savedProduct = await client.query(
            `
                UPDATE "product" 
                SET   ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedProduct.rows[0];
    },
};
