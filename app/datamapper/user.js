const client = require('../config/db');

/**
 * @typedef {object} User
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} route - Segment d'URL pour accéder à la user (pour SEO)
 * @property {string} label - Le nom affichable de la user
 */

/**
 * @typedef {Object} InputUser
 * @property {string} route - Segment d'URL pour accéder à la user (pour SEO)
 * @property {string} label - Le nom affichable de la user
 */

module.exports = {
    /**
     * Récupère tout sans filtre ni ordre
     * @returns Tous les categories dans la base de donnée
    */
    async findAll() {
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },

    /**
     * Récupère par sont id
     * @param {number} userId - L'id de la categorie souhaité
     * @returns La categorie souhaité ou null si aucune categorie à cet id
     */
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
                INSERT INTO category
                (label, route) VALUES
                ($1, $2) RETURNING *
            `,
            [user.label, user.route],
        );

        return savedUser.rows[0];
    },
    async update(id, user) {
        const fields = Object.keys(user).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(user);

        const savedUser = await client.query(
            `
                UPDATE user SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedUser.rows[0];
    },

    async delete(id) {
        const result = await client.query('DELETE FROM user WHERE id = $1', [id]);
        // Soit il a supprimer un enregistrement et
        // le rowcount est égal à 1 (truthy)soit non et il est égal a 0 (falsy)
        // On cast le truthy/falsy en vrai booléen
        return !!result.rowCount;
    },
    async isUnique(inputData, userId) {
        const fields = [];
        const values = [];
        // On récupère la liste des infos envoyés
        Object.entries(inputData).forEach(([key, value], index) => {
            // On ne garde que les infos qui sont censées être unique
            if (['label', 'route'].includes(key)) {
                // On génère le filtre avec ces infos
                fields.push(`"${key}" = $${index + 1}`);
                values.push(value);
            }
        });

        const preparedQuery = {
            text: `SELECT * FROM user WHERE (${fields.join(' OR ')})`,
            values,
        };

        // Si l'id est fourni on exclu l'enregistrement qui lui correspond
        if (userId) {
            preparedQuery.text += ` AND id <> $${values.length + 1}`;
            preparedQuery.values.push(userId);
        }
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};
