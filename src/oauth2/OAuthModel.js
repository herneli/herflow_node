import jwt from "jsonwebtoken";
import moment from "moment";
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
    this.users = [
      {
        id: "1",
        username: "jordi",
        name: "Jordi Hernández Amo",
        password: "pass"
      }
    ];
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
    // var tokens = this.tokens.filter(function(token) {
    //   return token.accessToken === bearerToken;
    // });

    // return tokens.length ? tokens[0] : false;
    const secret = process.env.JWT_SECRET;
    try {
      let token = jwt.verify(bearerToken, secret);
    } catch (error) {
      console.log(error.message);
      return false;
    }
    console.log(token);
    return {
      accessTokenExpiresAt: moment.unix(token.exp).toDate(),
      client_id: token.aud,
      user: token.sub
    };
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
      userId: user.id,
      user: user
    };
    //this.tokens.push(tokenData);
    return tokenData;
  }

  getUser(username, password) {
    var users = this.users.filter(function(user) {
      return user.username === username && user.password === password;
    });

    return users.length ? users[0] : false;
  }

  generateAccessToken(client, user, scope) {
    const secret = process.env.JWT_SECRET;
    const iss = process.env.JWT_ISSUER;
    return jwt.sign(
      { name: user.name, aud: client.clientId, iss, sub: user.username },
      secret,
      {
        expiresIn: 60 * 30
      }
    );
  }
}
export default InMemoryCache;
