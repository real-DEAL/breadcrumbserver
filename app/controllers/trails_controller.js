/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_data"] }]*/
/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["crumb"] }]*/

'use strict';

const Nodal = require('nodal');

const AuthController = Nodal.require('app/controllers/auth_controller.js');

const Trail = Nodal.require('app/models/trail.js');
const rp = require('request-promise');

class TrailsController extends AuthController {

  index() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
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
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
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
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
   /**
    * @param: trails and all their crumbs
    * @param: Ouput: sends request to server to submit all the crumbs
    *
    */
    const crumbs = this.params.body.crumbs;
    Trail.create(this.params.body, (err, model) => {
      crumbs.forEach((crumb) => {
        crumb.trail_id = model._data.id;
        rp({ method: 'POST',
          uri: `${Nodal.my.Config.secrets.host}${Nodal.my.Config.secrets.port}/crumbs`,
          form: crumb,
        })
       .then(() => {
         this.respond('trail created');
       })
      .catch((error) => {
        this.respond(`There was an error creating this trail ${error} `);
      });
      });
    });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Trail.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    /**
     * @param: trails and all their crumbs
     * @param: Deletes the Trail and makes requessts to destroy all the crumbs of the same trail
     *
     */
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
