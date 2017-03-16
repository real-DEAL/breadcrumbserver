'use strict';

const Nodal = require('nodal');
const Trail = Nodal.require('app/models/trail.js');

class TrailsController extends Nodal.Controller {

  index() {

    Trail.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Trail.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Trail.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Trail.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Trail.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = TrailsController;
