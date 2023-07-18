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
};
