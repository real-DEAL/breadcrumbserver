/* eslint no-underscore-dangle: ["error", { "allow": ["_data"] }]*/

'use strict';

const Nodal = require('nodal');

const User = Nodal.require('app/models/user.js');
const AccessToken = Nodal.require('app/models/access_token.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');
const Q = require('q');

class UsersController extends AuthController {
  index() {
    // TODO find way to promisify this, something about .end prevents it
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
    const findUser = Q.nbind(User.find, User);
    findUser(this.params.route.id)
      .then((model) => {
        this.respond(this.respond(model, [
          'id',
          'email',
          'username',
          'score',
          'total_completed',
          'current_trail',
          'profile_picture',
          'access_token',
          'social_login',
        ]));
      })
      .catch((err) => { this.respond(err); });
  }
  create() {
    /**
    *@params Takes new user
    *@params using new user, creates a session token and updates the uper
    * adds token to user in database
    *TODO find working promise structure for this, there is disconnect between
    *  the create users and AccessToken methods, most likely the switching between
    *  objects and object models
    **/
    User.create(this.params.body, (err) => {
      if (err) { this.respond(err); }
      this.params.body.grant_type = 'password';
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

    const updateUser = Q.nbind(User.update, User);
    updateUser(this.params.route.id, this.params.body)
      .then((model) => {
        this.respond(model, [
          'username',
          'score',
          'total_completed',
          'current_trail',
          'profile_picture',
          'social_login',
          { trail: ['id'] },
          { savedtrail: ['id'] },
        ]);
      })
      .catch((err) => { this.respond(err); });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const deleteUser = Q.nbind(User.destroy, User);
    deleteUser(this.params.route.id)
      .then(() => { this.respond('User Deleted!'); })
      .catch((err) => { this.respond(err); });
  }
}

module.exports = UsersController;
