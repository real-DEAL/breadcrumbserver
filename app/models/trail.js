'use strict';

const Nodal = require('nodal');

const User = Nodal.require('app/models/user.js');

class Trail extends Nodal.Model {}

Trail.setDatabase(Nodal.require('db/main.js'));
Trail.setSchema(Nodal.my.Schema.models.Trail);
Trail.joinsTo(User, { multiple: true, as: 'trail' });


module.exports = Trail;
