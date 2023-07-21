const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM document');
        return result.rows;
    },

    async findByPk(documentId) {
        const result = await client.query('SELECT * FROM "document" WHERE id = $1', [documentId]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    async insert(document) {
        const savedDocument = await client.query(
            `
                INSERT INTO "document"
                (type, user_id) VALUES
                ($1, $2) RETURNING *
            `,
            [
                document.type,
                document.user_id,
            ],
        );

        return savedDocument.rows[0];
    },

    async update(id, document) {
        const fields = Object.keys(document).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(document);

        const savedDocument = await client.query(
            `
                UPDATE "document" 
                SET   ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedDocument.rows[0];
    },

    async delete(id) {
        try {
            await client.query('BEGIN');
            const deleteQuery = 'DELETE FROM "document" WHERE id = $1 RETURNING "document"."id"';
            const deleteValues = [id];
            await client.query(deleteQuery, deleteValues);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(error);
        }
    },
};
