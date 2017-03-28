/* eslint no-underscore-dangle: ["error", { "allow": ["_data"] }]*/

'use strict';

const Nodal = require('nodal');

const User = Nodal.require('app/models/user.js');
const AccessToken = Nodal.require('app/models/access_token.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');

class UsersController extends AuthController {
  index() {
    // if (this.params.query.social)
    User.query()
    .where(this.params.query)
    .join('savedtrail')
    .join('trail')
    .end((err, models) => {
      this.respond(err || models, [
        'id',
        'email',
        'username',
        'score',
        'total_completed',
        'current_trail',
        'profile_picture',
        'social_login',
        { trail: ['id'] },
        { savedtrail: ['id'] },
      ]);
    });
  }
  show() {
    User.find(this.params.route.id, (err, model) => {
      this.respond(err || model, [
        'id',
        'email',
        'username',
        'score',
        'total_completed',
        'current_trail',
        'profile_picture',
        'access_token',
        'social_login',
      ]);
    });
  }
  create() {
    /**
    *@params Takes new user
    *@params using new user, creates a session token and updates the uper
    * adds token to user in database
    *
    **/
    User.create(this.params.body, (err) => {
      if (err) { this.respond(err); }
      AccessToken.login(this.params, (error, accessToken) => {
        if (err) { this.respond(err); }
        this.params.body.access_token = accessToken._data.access_token;
        User.update(accessToken._data.user_id, this.params.body, (errs, user) => {
          this.respond(errs || user);
        });
      });
    });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    User.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model, [
        'username',
        'score',
        'total_completed',
        'current_trail',
        'profile_picture',
        'social_login',
        { trail: ['id'] },
        { savedtrail: ['id'] },
      ]);
    });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    User.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
}

module.exports = UsersController;
