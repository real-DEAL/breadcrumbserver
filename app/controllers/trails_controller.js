/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_data"] }]*/
/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["crumb"] }]*/

'use strict';

const Nodal = require('nodal');

const AuthController = Nodal.require('app/controllers/auth_controller.js');

const Trail = Nodal.require('app/models/trail.js');
const Crumb = Nodal.require('app/models/crumb.js');
// const ModelArray = Nodal.require('node_modules/nodal/core/required/model_array.js');
const Q = require('q');

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
          'crumb',
        ]);
      });
  }
  show() {
    const findTrail = Q.nbind(Trail.find, Trail);
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    findTrail(this.params.route.id)
      .then((success) => { this.respond(success); })
      .catch((err) => { this.respond(err); });
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
    const createTrail = Q.nbind(Trail.create, Trail);
    const addCrumb = Q.nbind(Crumb.create, Crumb);

    createTrail(this.params.body)
      .then((models) => {
        const trailId = models.toObject(['id']);
        this.params.body.crumbs.forEach((crumb, ind) => {
          crumb.order_number = ind + 1;
          crumb.trail_id = trailId.id;
          addCrumb(crumb)
            .then(() => { this.respond(models); })
            .catch((error) => { this.respond(error); });
        });
      })
      .catch((err) => { this.respond(err); });
  }
  update() {
    Trail.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    // TODO: We currently aren't using this route, will need to test in the
    // future the above is a promisified version
    // const updateTrail = Q.nbind(Trail.update, Trail);
    // updateTrail(this.params.route.id, this.params.body)
    //   .then((success) => { this.response(success); })
    //   .catch((arr) => { this.response(arr); });
  }
  destroy() {
    const deleteTrail = Q.nbind(Trail.destroy, Trail);

    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    /**
     * @param: trails and all their crumbs
     * @param: Deletes the Trail and makes requessts to destroy all the crumbs of the same trail
     *
     */
    deleteTrail(this.params.route.id)
    .then(() => { this.repond(`Trail number ${this.params.route.id} has been deleted!`); })
    .catch((err) => { this.respond(err); });
    Crumb.query()
      .where({ trail_id: this.params.route.id })
      .end((error, models) => {
        if (models) { models.destroyAll((err, success) => { this.respond(err || success); }); }
        this.respond(error || 'Trail Deleted');
      });
  }
}

module.exports = TrailsController;
