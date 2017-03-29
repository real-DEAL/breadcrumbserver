'use strict';

const Nodal = require('nodal');

const User = Nodal.require('/app/models/user.js');
const Trail = Nodal.require('/app/models/trail.js');


class Savedtrail extends Nodal.Model {}

Savedtrail.setDatabase(Nodal.require('db/main.js'));
Savedtrail.setSchema(Nodal.my.Schema.models.Savedtrail);
Savedtrail.joinsTo(User, { multiple: true, as: 'savedtrail' });
Savedtrail.joinsTo(Trail, { as: 'trail' });

module.exports = Savedtrail;
