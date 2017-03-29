'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');
const Q = require('q');

class V1AccessTokensController extends Nodal.Controller {
  create() {
    this.params.body = {
      password: this.params.body.social_login,
      grant_type: 'password',
      username: this.params.body.username,
    };
    const login = Q.nbind(AccessToken.login, AccessToken);
    login(this.params)
      .then((accessToken) => { this.respond(accessToken); })
      .catch((err) => { this.respond(err); });
  }
  destroy() {
    const logout = Q.nbind(AccessToken.logout, AccessToken);
    logout(this.params)
      .then((accessToken) => { this.respond(accessToken); })
      .catch((err) => { this.respond(err); });
  }
}

module.exports = V1AccessTokensController;
