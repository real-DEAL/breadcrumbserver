'use strict';

const Nodal = require('nodal');

const Crumb = Nodal.require('app/models/crumb.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');
class CrumbsController extends AuthController {
  index() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Crumb.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);
      });
  }
  show() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Crumb.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
  create() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Crumb.create(this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Crumb.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Crumb.destroy(this.params.route.id, (err) => {
      this.respond(err || 'Crumb has been deleted');
    });
  }
}

module.exports = CrumbsController;
