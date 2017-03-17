'use strict';

const Nodal = require('nodal');

const Savedtrail = Nodal.require('app/models/savedtrail.js');

class SavedtrailsController extends Nodal.Controller {
  index() {
    Savedtrail.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);
      });
  }
  show() {
    Savedtrail.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
  create() {
    Savedtrail.create(this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  update() {
    Savedtrail.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  destroy() {
    Savedtrail.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }

}

module.exports = SavedtrailsController;
