const client = require('../config/db');

/**
 * @typedef {object} client
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} route - Segment d'URL pour accéder à la client (pour SEO)
 * @property {string} label - Le nom affichable de la client
 */

/**
 * @typedef {Object} Inputclient
 * @property {string} route - Segment d'URL pour accéder à la client (pour SEO)
 * @property {string} label - Le nom affichable de la client
 */

module.exports = {
    /**
     * Récupère tout sans filtre ni ordre
     * @returns Tous les categories dans la base de donnée
    */
    async findAll() {
        const result = await client.query('SELECT * FROM client');
        return result.rows;
    },
};
