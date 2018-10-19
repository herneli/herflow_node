import jwt from "jsonwebtoken";
import moment from "moment";
import db from "../models";
/**
 * Constructor.
 */

class OAuthModelsDb {
  constructor() {
    // this.clients = [
    //   {
    //     clientId: "client01",
    //     clientSecret: "secret01",
    //     redirectUris: [""],
    //     grants: ["password"]
    //   }
    // ];
    // this.tokens = [];
    // this.users = [
    //   {
    //     id: "1",
    //     username: "jordi",
    //     name: "Jordi Hernández Amo",
    //     password: "pass"
    //   }
    // ];
  }

  /**
   * Dump the cache.
   */

  dump() {
    console.log("clients", this.clients);
    console.log("tokens", this.tokens);
    console.log("users", this.users);
  }

  getAccessToken(bearerToken) {
    const secret = process.env.JWT_SECRET;
    try {
      let token = jwt.verify(bearerToken, secret, { clockTolerance: 10 });
      return {
        accessTokenExpiresAt: moment.unix(token.exp).toDate(),
        client_id: token.aud,
        user: token.sub
      };
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  getRefreshToken(bearerToken) {
    var tokens = this.tokens.filter(function(token) {
      return token.refreshToken === bearerToken;
    });

    return tokens.length ? tokens[0] : false;
  }

  getClient(clientId, clientSecret) {
    return db.Client.findOne({ where: { clientId: clientId } })
      .then(client => {
        return {
          clientId: client.clientId,
          clientSecret: client.clientSecret,
          redirectUris: client.redirectUris
            ? client.redirectUris.split(",")
            : [],
          grants: client.grants ? client.grants.split(",") : []
        };
      })
      .catch(reason => {
        console.log(reason);
        return false;
      });
  }

  saveToken(token, client, user) {
    let tokenData = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: client.clientId,
      client: client,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      userId: user.id,
      user: user
    };
    //this.tokens.push(tokenData);
    return tokenData;
  }

  getUser(username, password) {
    return db.User.findOne({ where: { email: username } })
      .then(user => {
        if (user.isValidPassword(password)) {
          return user;
        } else {
          return false;
        }
      })
      .catch(reason => {
        console.log(reason);
        return false;
      });
  }

  generateAccessToken(client, user, scope) {
    const iss = process.env.JWT_ISSUER;
    return jwt.sign(
      { name: user.name, aud: client.clientId, iss, sub: user.email },
      client.clientSecret,
      {
        expiresIn: 60 * 30
      }
    );
  }
}
export default OAuthModelsDb;
