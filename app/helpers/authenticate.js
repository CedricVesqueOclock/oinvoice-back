import jwt from 'jsonwebtoken';

export default {

    async getUser(req) {
        try {
            // req.headers.authorization renvois : Bearer <token>
            const bearer = req.headers.authorization || '';
            if (!bearer) {
                throw new Error('no authorization');
            }

            // ici on va donc separer le bearer de manière à ne garder que le token (jeton)
            // le résultat va donc ètre
            // Bearer eyJhbGciOiJIUzI1N
            // split(' ')
            /*
      [
        'Bearer',
        'eyJhbGciOiJIUzI1N'
      ]
      */
            const [, token] = bearer.split(' ');
            // on passe en parametre la clé que l'on a définis dans le .env
            const user = await jwt.verify(token, process.env.JSON_WEB_TOKEN_PRIVATE_KEY);

            if (!user) {
                return null;
            }
            // Afin d'avoir une sécurité supplémentaire on vérifie que l'ip d'utilisation est la même que
            // l'ip de création du token
            if (user.ip !== req.ip) {
                return null;
            }
            /*
      {
        id: 1,
        email: 'jean.dupont@oclock.io,
        firstname: 'Jean',
        lastname: 'Dupont,
        ip: '192.168.1.1',
      },
      */
            return user;
        } catch (err) {
            // En cas d'erreur de jwt (par exemple jwt expires) on ne renvois rien.
            return null;
        }
    },

};
