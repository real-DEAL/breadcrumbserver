/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_data"] }]*/
/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["crumb"] }]*/

'use strict';

const Nodal = require('nodal');

const AuthController = Nodal.require('app/controllers/auth_controller.js');

const Trail = Nodal.require('app/models/trail.js');
const Crumb = Nodal.require('app/models/crumb.js');
const ModelArray = Nodal.require('node_modules/nodal/core/required/model_array.js');


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
    * Takes in trail, creates a model array from the crumbs adds the trail_id and
    * saves to database
    */

    Trail.create(this.params.body, (err, models) => {
      if (err) { this.respond(err); }
      const trailId = models.toObject(['id']);
      this.params.body.crumbs.forEach((crumb, ind) => {
        crumb.order_number = ind + 1;
        crumb.trail_id = trailId.id;
        Crumb.create(crumb, (error, success) => {
          this.respond(error || success);
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
    Trail.destroy(this.params.route.id, (err) => {
      this.respond(err || `Trail number ${this.params.route.id} has been deleted!`);
    });
    Crumb.query().where({ trail_id: this.params.route.id })
    .end((error, models) => {
      if (models) {
        models.destroyAll();
      }
      this.respond(error || 'Trail Deleted');
    });
  }
}

module.exports = TrailsController;
