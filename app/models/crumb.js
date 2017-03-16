// 'use strict';

const Nodal = require('nodal');

const Trail = Nodal.require('app/models/trail.js');

class Crumb extends Nodal.Model {}

Crumb.setDatabase(Nodal.require('db/main.js'));
Crumb.setSchema(Nodal.my.Schema.models.Crumb);
Crumb.joinsTo(Trail, { multiple: true, as: 'crumb' });

module.exports = Crumb;
