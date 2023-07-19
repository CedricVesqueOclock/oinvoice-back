const clientDb = require('../config/db');

module.exports = {

    async findAll() {
        const result = await clientDb.query('SELECT * FROM client');
        return result.rows;
    },

    async findByPk(clientId) {
        const result = await clientDb.query('SELECT * FROM "client" WHERE id = $1', [clientId]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    async insert(client) {
        const savedClient = await clientDb.query(
            `
                INSERT INTO "client"
                (firstname, lastname, siret, siren, mail, adress, zip_code, city, number, user_id) VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
            `,
            [
                client.firstname,
                client.lastname,
                client.siret,
                client.siren,
                client.mail,
                client.adress,
                client.zip_code,
                client.city,
                client.number,
                client.user_id,
            ],
        );

        return savedClient.rows[0];
    },

    async update(id, client) {
        const fields = Object.keys(client).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(client);

        const savedClient = await clientDb.query(
            `
                UPDATE "client" 
                SET   ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedClient.rows[0];
    },
    async delete(id) {
        try {
            await clientDb.query('BEGIN');
            const deleteQuery = 'DELETE FROM "client" WHERE id = $1 RETURNING "client"."id"';
            const deleteValues = [id];
            await clientDb.query(deleteQuery, deleteValues);
            await clientDb.query('COMMIT');
        } catch (error) {
            await clientDb.query('ROLLBACK');
            throw new Error(error);
        }
    },
};
