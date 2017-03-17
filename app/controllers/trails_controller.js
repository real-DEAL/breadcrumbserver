// 'use strict';

const Nodal = require('nodal');

const Trail = Nodal.require('app/models/trail.js');

class TrailsController extends Nodal.Controller {

  index() {
    Trail.query()
      .where(this.params.query)
      .join('crumb')
      .end((err, models) => {
        this.respond(err || models, [
          'id',
          'user_id',
          'name',
          'description',
          'rating',
          'type',
          'transport',
          'length',
          'difficulty',
          'map',
          'time',
          'requires_money',
          // 'start_crumb',
          // 'end_crumb',
          'created_at',
          'updated_at',
          { crumb: [
            'id',
            'trail_id',
            'name',
            'description',
            'order_number',
            'geoid',
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
            'ar'] },
        ]);
      });
  }
  show() {
    Trail.find(this.params.route.id, (err, model) => {
      this.respond(err || model, [
        'id',
        'user_id',
        'name',
        'description',
        'rating',
        'type',
        'transport',
        'length',
        'difficulty',
        'map',
        'time',
        'requires_money',
        'start_crumb',
        'end_crumb',
        'created_at',
        'updated_at',
        { crumb: ['trail_id',
          'name',
          'description',
          'order_number',
          'geoid',
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
          'ar'] },
      ]);
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
