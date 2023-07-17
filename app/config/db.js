const debug = require('debug')('app:sql');
const { Pool } = require('pg');

const pool = new Pool();
// On a pas a connecter la Pool, c'est elle qui va décidé quand et comment conne cter une nouveau
// client.

module.exports = {
    // On expose quand même le client original "au cas ou"
    originalClient: pool,

    // On fait une méthode pour "intercepter"
    // les requêtes afin de pouvoir les afficher
    // L'opérateur de "rest" permet de transformer
    // ici X variables en param. en un tableau
    async query(...params) {
        debug(...params);

        // L'opérateur ici fait l'effet inverse on transforme
        // un tableau en une liste
        // de variables / paramétre ce qui fait que la méthode query du client sera
        // appelé exactement de la même façon que celle de notre module
        return this.originalClient.query(...params);
    },
};



// var articulations = ['épaules', 'genoux'];
// var corps = ['têtes', ...articulations, 'bras', 'pieds'];
// console.log(corps)
