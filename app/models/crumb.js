'use strict';

const Nodal = require('nodal');

class Crumb extends Nodal.Model {}

Crumb.setDatabase(Nodal.require('db/main.js'));
Crumb.setSchema(Nodal.my.Schema.models.Crumb);

module.exports = Crumb;
