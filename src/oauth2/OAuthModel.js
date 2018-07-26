
/**
 * Constructor.
 */

class InMemoryCache {
  constructor(){
    this.clients = [{ clientId : 'thom', clientSecret : 'nightworld', redirectUris : [''], grants: ['password'] }];
    this.tokens = [];
    this.users = [{ id : '123', username: 'thomseddon', password: 'nightworld' }];
  }

/**
 * Dump the cache.
 */

  dump() {
    console.log('clients', this.clients);
    console.log('tokens', this.tokens);
    console.log('users', this.users);
  }

  getAccessToken(bearerToken) {
    var tokens = this.tokens.filter(function(token) {
      return token.accessToken === bearerToken;
    });

    return tokens.length ? tokens[0] : false;
  }

  getRefreshToken(bearerToken) {
    var tokens = this.tokens.filter(function(token) {
      return token.refreshToken === bearerToken;
    });

    return tokens.length ? tokens[0] : false;
  }

  getClient(clientId, clientSecret) {
    var clients = this.clients.filter(function(client) {
      return client.clientId === clientId && client.clientSecret === clientSecret;
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
    this.tokens.push(tokenData);
    return tokenData;
  }

  getUser(username, password) {
    var users = this.users.filter(function(user) {
      return user.username === username && user.password === password;
    });

    return users.length ? users[0] : false;
  }
}
export default InMemoryCache;