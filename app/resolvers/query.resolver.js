import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../errors/apiError';

export default {

  async login(_, { email, password }, { dataSources, ip }) {
    // Etape 1 : On récupère le potentiel utilisateur en BDD
    // FindAll récupère un tableau d'enregistrement
    const [user] = await dataSources.oinvoice.userDatamapper.findAll({ where: { email } });
    if (!user) {
      throw new ApiError('Authentication failed.', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // S'il est valide
    // Etape 2 : on vérifie que le mot de pass correspond a celui en BDD

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new ApiError('Authentication failed.', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    // Si le compte existe ET que le mot de passe est valide on peut créer le token
    const expiresIn = parseInt(process.env.JSON_WEB_TOKEN_EXPIRES_IN_SECONDS, 10) ?? 300;
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        // on peut en profiter pour rajouter des informations utiles
        ip,
      },
      process.env.JSON_WEB_TOKEN_PRIVATE_KEY,
      { expiresIn },
    );

    const now = new Date();
    const time = now.getTime();

    return {
      token,
      expireAt: time + expiresIn,
    };
  },

  // user : utilisateur potentiellement authentifié par json web token
  async user(_, __, { dataSources, user }) {
    if (!user) {
      throw new ApiError("You don't have access to this resource.", {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const user = await dataSources.oinvoice.userDatamapper.findByPk(user.id);
    return user;
  }
}