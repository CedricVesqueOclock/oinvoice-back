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
        const result = await client.query('SELECT * FROM user');
        return result.rows;
    },
};
