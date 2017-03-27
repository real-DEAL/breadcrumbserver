'use strict';

const Nodal = require('nodal');

const ArMessage = Nodal.require('app/models/ar_message.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');


class ArMessagesController extends AuthController {

  index() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    ArMessage.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);
      });
  }
  show() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    ArMessage.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
  create() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    ArMessage.create(this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    ArMessage.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    ArMessage.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
}

module.exports = ArMessagesController;
