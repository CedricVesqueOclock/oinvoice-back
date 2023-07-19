const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },

    async findByPk(userId) {
        const result = await client.query('SELECT * FROM "user" WHERE id = $1', [userId]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },
    async insert(user) {
        const savedUser = await client.query(
            `
                INSERT INTO "user"
                (mail, password, siret, siren, name, adress, zip_code, city, number) VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
            [
                user.mail,
                user.password,
                user.siret,
                user.siren,
                user.name,
                user.adress,
                user.zip_code,
                user.city,
                user.number,
            ],
        );

        return savedUser.rows[0];
    },

    async update(id, user) {
        const fields = Object.keys(user).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(user);

        const savedUser = await client.query(
            `
                UPDATE "user" 
                SET   ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedUser.rows[0];
    },

    async delete(id) {
        try {
            await client.query('BEGIN');
            const deleteQuery = 'DELETE FROM "user" WHERE id = $1 RETURNING "user"."id"';
            const deleteValues = [id];
            await client.query(deleteQuery, deleteValues);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(error);
        }
    },
};
