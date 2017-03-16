'use strict';

const Nodal = require('nodal');

class Savedtrail extends Nodal.Model {}

Savedtrail.setDatabase(Nodal.require('db/main.js'));
Savedtrail.setSchema(Nodal.my.Schema.models.Savedtrail);

module.exports = Savedtrail;
