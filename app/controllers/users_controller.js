'use strict';

const Nodal = require('nodal');

const User = Nodal.require('app/models/user.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');

class UsersController extends AuthController {

  index() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    User.query()
      .where(this.params.query)
      .join('trail')
      .join('savedtrail')
      .end((err, models) => {
        this.respond(err || models, [
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
        { trail: ['id'] },
        { savedtrail: ['id'] },
      ]);
    });
  }
  create() {
    User.create(this.params.body, (err, model) => {
      // TODO update so that the user model doesn't return ;
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
