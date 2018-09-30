import jwt from "jsonwebtoken";
import moment from "moment";
import bcrypt from "bcrypt";
import UnitOfWorkFactory from "../uow/UnitOfWorkFactory";
import UserRepository from "../repos/UserRepository";
import config from "../config";
/**
 * Constructor.
 */

class InMemoryCache {
  constructor() {
    this.clients = [
      {
        clientId: "client01",
        clientSecret: "secret01",
        redirectUris: [""],
        grants: ["password"]
      }
    ];
    this.tokens = [];
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
    console.log("getAccessToken");
    // var tokens = this.tokens.filter(function(token) {
    //   return token.accessToken === bearerToken;
    // });

    // return tokens.length ? tokens[0] : false;
    const secret = config.jwt.secret;
    try {
      let token = jwt.verify(bearerToken, secret);
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
    var clients = this.clients.filter(function(client) {
      return client.clientId === clientId;
    });

    return clients.length ? clients[0] : false;
  }

  saveToken(token, client, user) {
    let tokenData = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: client.clientId,
      client: client,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      userId: user.usercode,
      user: user
    };
    //this.tokens.push(tokenData);
    return tokenData;
  }

  getUser(username, password) {
    console.log("getUser");
    return UnitOfWorkFactory.create().then(uow => {
      let userRepo = new UserRepository(uow);
      return userRepo.getByUserCode(username).then(user => {
        uow.release();
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            return user;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    });
  }

  generateAccessToken(client, user, scope) {
    const secret = config.jwt.secret;
    const iss = config.jwt.issuer;
    return jwt.sign(
      { name: user.name, aud: client.clientId, iss, sub: user.usercode },
      secret,
      {
        expiresIn: 60 * 30
      }
    );
  }
}
export default InMemoryCache;
