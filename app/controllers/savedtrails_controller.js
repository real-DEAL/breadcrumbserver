'use strict';

const Nodal = require('nodal');

const Savedtrail = Nodal.require('app/models/savedtrail.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');

class SavedtrailsController extends AuthController {
  index() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Savedtrail.query()
      .where(this.params.query)
      .join('trail')
      .end((err, models) => {
        this.respond(err || models, [
          'user_id',
          'trail_id',
          'position',
          'time_start',
          'time_finished',
          { trail: [
            'name',
            'description',
            'max_rating',
            'rating',
            'transport',
            'length',
            'requires_money',
            'difficulty',
            'map',
          ] },
        ]);
      });
  }
  show() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Savedtrail.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
  create() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Savedtrail.create(this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Savedtrail.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Savedtrail.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }

}

module.exports = SavedtrailsController;
