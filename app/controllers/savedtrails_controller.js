'use strict';

const Nodal = require('nodal');

const Savedtrail = Nodal.require('app/models/savedtrail.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');
const Q = require('q');

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
    const findSavedtrail = Q.nbind(Savedtrail.find, Savedtrail);
    findSavedtrail(this.params.route.id)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  create() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const createSavedTrail = Q.nbind(Savedtrail.create, Savedtrail);
    createSavedTrail(this.params.body)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const updateTrail = Q.nbind(Savedtrail.update, Savedtrail);
    updateTrail(this.params.route.id, this.params.body)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const deleteSavedTrail = Q.nbind(Savedtrail.destroy, Savedtrail);
    deleteSavedTrail(this.params.route.id)
      .then(() => { this.respond('Savedtrail has been deleted'); })
      .catch((err) => { this.respond(err); });
  }

}

module.exports = SavedtrailsController;
