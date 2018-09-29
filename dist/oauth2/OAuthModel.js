"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Constructor.
 */

var InMemoryCache = function () {
  function InMemoryCache() {
    _classCallCheck(this, InMemoryCache);

    this.clients = [{
      clientId: "client01",
      clientSecret: "secret01",
      redirectUris: [""],
      grants: ["password"]
    }];
    this.tokens = [];
    this.users = [{
      id: "1",
      username: "jordi",
      name: "Jordi Hernández Amo",
      password: "pass"
    }];
  }

  /**
   * Dump the cache.
   */

  _createClass(InMemoryCache, [{
    key: "dump",
    value: function dump() {
      console.log("clients", this.clients);
      console.log("tokens", this.tokens);
      console.log("users", this.users);
    }
  }, {
    key: "getAccessToken",
    value: function getAccessToken(bearerToken) {
      // var tokens = this.tokens.filter(function(token) {
      //   return token.accessToken === bearerToken;
      // });

      // return tokens.length ? tokens[0] : false;
      var secret = process.env.JWT_SECRET;
      try {
        var token = _jsonwebtoken2.default.verify(bearerToken, secret);
        return {
          accessTokenExpiresAt: _moment2.default.unix(token.exp).toDate(),
          client_id: token.aud,
          user: token.sub,
          zapato: "Manolo"
        };
      } catch (error) {
        console.log(error.message);
        return false;
      }
    }
  }, {
    key: "getRefreshToken",
    value: function getRefreshToken(bearerToken) {
      var tokens = this.tokens.filter(function (token) {
        return token.refreshToken === bearerToken;
      });

      return tokens.length ? tokens[0] : false;
    }
  }, {
    key: "getClient",
    value: function getClient(clientId, clientSecret) {
      var clients = this.clients.filter(function (client) {
        return client.clientId === clientId;
      });

      return clients.length ? clients[0] : false;
    }
  }, {
    key: "saveToken",
    value: function saveToken(token, client, user) {
      var tokenData = {
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
  }, {
    key: "getUser",
    value: function getUser(username, password) {
      var users = this.users.filter(function (user) {
        return user.username === username && user.password === password;
      });

      return users.length ? users[0] : false;
    }
  }, {
    key: "generateAccessToken",
    value: function generateAccessToken(client, user, scope) {
      var secret = process.env.JWT_SECRET;
      var iss = process.env.JWT_ISSUER;
      return _jsonwebtoken2.default.sign({ name: user.name, aud: client.clientId, iss: iss, sub: user.username }, secret, {
        expiresIn: 60 * 30
      });
    }
  }]);

  return InMemoryCache;
}();

exports.default = InMemoryCache;
//# sourceMappingURL=OAuthModel.js.map