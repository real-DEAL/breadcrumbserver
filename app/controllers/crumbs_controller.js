// 'use strict';

const Nodal = require('nodal');

const Crumb = Nodal.require('app/models/crumb.js');
class CrumbsController extends Nodal.Controller {

  index() {
    Crumb.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models, [
          'trail_id',
          'name',
          'description',
          'order_number',
          'geoId',
          'latitude',
          'longitude',
          'radius',
          'notification_id',
          'title',
          'small_icon',
          'open_app_on_click',
          'vibration',
          'data',
          'text',
          'image',
          'video',
          'aR',
        ]);
      });
  }
  show() {
    Crumb.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
  create() {
    Crumb.create(this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  update() {
    Crumb.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  destroy() {
    Crumb.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
}

module.exports = CrumbsController;
