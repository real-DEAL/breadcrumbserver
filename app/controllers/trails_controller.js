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
    const trailId = this.params.route.id;
    Trail.destroy(trailId, (err, model) => {
      // this.respond(err || model);
      rp({ method: 'GET', uri: `http://localhost:3000/crumbs?trail_id=${trailId}` })
        .then((crumbs) => {
          console.warn('crumbs')
          JSON.parse(crumbs).data.forEach((crumb) => {
            console.log(crumb);
            rp({ method: 'DELETE', uri: `http://localhost:3000/crumbs/${crumb.id}` })
            .then((deletedcrumbs) => { console.warn(`deleted${deletedcrumbs}`); })
            .catch((error) =>{ console.warn(`Error deleting crumbs`)});
          });
        })
        .catch((error) => {
          this.respond(`There was an error deleting this trail: ${error}`);
        });
    });
  }
}

module.exports = TrailsController;
