'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');

class V1AccessTokensController extends Nodal.Controller {
  create() {
    this.params.body = {
      password: this.params.body.social_login,
      grant_type: 'password',
      username: this.params.body.username,
    };
    AccessToken.login(this.params, (err, accessToken) => {
      this.respond(err || accessToken);
    });
  }
  destroy() {
    AccessToken.logout(this.params, (err, accessToken) => {
      this.respond(err || accessToken);
    });
  }
}

module.exports = V1AccessTokensController;
