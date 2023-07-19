const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM "document_line"');
        return result.rows;
    },

    async findByPk(documentLineId) {
        const result = await client.query('SELECT * FROM "document_line" WHERE id = $1', [documentLineId]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },
    async insert(documentLine) {
        const savedDocumentLine = await client.query(
            `
                INSERT INTO "document_line"
                (quantity, price, document_id, client_id, product_id) VALUES
                ($1, $2, $3, $4, $5) RETURNING *
            `,
            [
                documentLine.quantity,
                documentLine.price,
                documentLine.document_id,
                documentLine.client_id,
                documentLine.product_id,
            ],
        );

        return savedDocumentLine.rows[0];
    },

    async update(id, documentLine) {
        const fields = Object.keys(documentLine).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(documentLine);

        const savedDocumentLine = await client.query(
            `
                UPDATE "document_line" 
                SET   ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedDocumentLine.rows[0];
    },
    async delete(id) {
        try {
            await client.query('BEGIN');
            const deleteQuery = 'DELETE FROM "document_line" WHERE id = $1 RETURNING "document_line"."id"';
            const deleteValues = [id];
            await client.query(deleteQuery, deleteValues);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(error);
        }
    },
};
