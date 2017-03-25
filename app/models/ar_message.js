'use strict';

const Nodal = require('nodal');

class ArMessage extends Nodal.Model {}

ArMessage.setDatabase(Nodal.require('db/main.js'));
ArMessage.setSchema(Nodal.my.Schema.models.ArMessage);

module.exports = ArMessage;
