/* eslint no-underscore-dangle: ["error", { "allow": ["_data"] }]*/

'use strict';

const Nodal = require('nodal');

const User = Nodal.require('app/models/user.js');
const AccessToken = Nodal.require('app/models/access_token.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');
const rp = require('request-promise');

class UsersController extends AuthController {
  /**
  *@params Takes new user
  *@params using new user, creates a session token and updates the uper
  * adds token to user in database
  *
  **/
  index() {
    User.query()
      .where(this.params.query)
      .join('trail')
      .join('savedtrail')
      .end((err, models) => {
        if (err) { this.respond(err); }
        if (this.params.query.token) {
          AccessToken.login(this.params, (error, accessToken) => {
            this.params.body.access_token = accessToken._data.access_token;
            User.update(accessToken._data.user_id, this.params.body, (user) => {
              this.respond('incorrect username or password' || user);
            });
          });
        }
        this.respond(models, [
          'id',
          'email',
          'username',
          'score',
          'total_completed',
          'current_trail',
          'profile_picture',
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
      ]);
    });
  }
  create() {
    // TODO cleanup callbackhell
    User.create(this.params.body, (err) => {
      if (err) { this.respond(err); }
      AccessToken.login(this.params, (error, accessToken) => {
        this.params.body.access_token = accessToken._data.access_token;
        User.update(accessToken._data.user_id, this.params.body, (errs, user) => {
          this.respond(errs || user);
        });
      });
      if (err) { this.respond(err); }
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
