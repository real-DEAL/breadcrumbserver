'use strict';

const Nodal = require('nodal');

const Crumb = Nodal.require('app/models/crumb.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');
const Q = require('q');

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
    const findCrumb = Q.nbind(Crumb.find, Crumb);
    findCrumb(this.params.route.id)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  create() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const createCrumb = Q.nbind(Crumb.create, Crumb);
    createCrumb(this.params.body)
      .then((model) => { this.respond(model); })
      .catch((err) => { this.respond(err); });
  }
  update() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    Crumb.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });

    // TODO currently not using this route, will need to test when we do
    // have already instantiated the possible promise pattern
    // const updateCrumb = Q.nbind(Crumb.update, Crumb);
    // updateCrumb(this.params.route.id, this.params.body)
    //   .then((model) => { this.respond(model); })
    //   .catch((err) => { this.respond(err); });
    //
  }
  destroy() {
    this.authorize((accessToken, user) => {
      this.params.body.user_id = user.get('id');
    });
    const deleteCrumb = Q.nbind(Crumb.destroy, Crumb);
    deleteCrumb(this.params.route.id)
      .then(() => { this.respond('Crumb has been deleted'); })
      .catch((err) => { this.respond(err); });
  }
}

module.exports = CrumbsController;
