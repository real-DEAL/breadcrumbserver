/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
'use strict';

const Nodal = require('nodal');

const Trail = Nodal.require('app/models/trail.js');
const rp = require('request-promise');

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
            'media_text',
            'id',
            'trail_id',
            'challenge',
            'name',
            'address',
            'description',
            'order_number',
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
            'clue',
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
          'media_text',
          'name',
          'description',
          'order_number',
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
    const trailId = this.params.route.id;
    Trail.destroy(trailId, (err) => {
      rp({ method: 'GET', uri: `${Nodal.my.Config.secrets.host}${Nodal.my.Config.secrets.port}/crumbs?trail_id=${trailId}` })
        .then((crumbs) => {
          const crumbList = JSON.parse(crumbs).data;
          if (crumbList[0]) {
            crumbList.forEach((crumb) => {
              rp({ method: 'DELETE', uri: `${Nodal.my.Config.secrets.host}${Nodal.my.Config.secrets.port}/crumbs/${crumb.id}` })
              // .then((deletedcrumbs) => { console.warn(`deleted${deletedcrumbs}`); })
              .catch((error) => { console.warn(`Error deleting crumbs: ${error}`); });
            });
          }
        })
        .catch((error) => {
          this.respond(`There was an error deleting this trail: ${error}`);
        });
      this.respond(err || `Trail number ${trailId} has been deleted!`);
    });
  }
}

module.exports = TrailsController;
