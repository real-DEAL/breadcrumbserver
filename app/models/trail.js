'use strict';

const Nodal = require('nodal');

class Trail extends Nodal.Model {}

Trail.setDatabase(Nodal.require('db/main.js'));
Trail.setSchema(Nodal.my.Schema.models.Trail);

module.exports = Trail;
