'use strict';

const Nodal = require('nodal');

const User = Nodal.require('/app/models/user.js');

class Savedtrail extends Nodal.Model {}

Savedtrail.setDatabase(Nodal.require('db/main.js'));
Savedtrail.setSchema(Nodal.my.Schema.models.Savedtrail);
Savedtrail.joinsTo(User, { multiple: true, as: 'savedtrail' });

module.exports = Savedtrail;
