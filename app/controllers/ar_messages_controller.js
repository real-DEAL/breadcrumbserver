'use strict';

const Nodal = require('nodal');

const ArMessage = Nodal.require('app/models/ar_message.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');
const Q = require('q');

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
    const findArMessage = Q.nbind(ArMessage.find, ArMessage);
    findArMessage(this.params.route.id)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  create() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const createArMessage = Q.nbind(ArMessage.create, ArMessage);
    createArMessage(this.params.body)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const updateArMessage = Q.nbind(ArMessage.update, ArMessage);
    updateArMessage(this.params.route.id, this.params.body)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const deleteArMessage = Q.nbind(ArMessage.destroy, ArMessage);
    deleteArMessage(this.params.route.id)
      .then(() => { this.respond('ArMessage has been deleted'); })
      .catch((err) => { this.respond(err); });
  }
}

module.exports = ArMessagesController;
