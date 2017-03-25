'use strict';

const Nodal = require('nodal');

const ArMessage = Nodal.require('app/models/ar_message.js');

class ArMessagesController extends Nodal.Controller {

  index() {
    ArMessage.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);
      });
  }
  show() {
    ArMessage.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
  create() {
    ArMessage.create(this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  update() {
    ArMessage.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  destroy() {
    ArMessage.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
}

module.exports = ArMessagesController;
