'use strict';

const Nodal = require('nodal');

class CreateTrails extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017031601234000;
  }

  up() {
    return [
      this.createTable('trails', [
        { name: 'user_id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'max_rating', type: 'int' },
        { name: 'rating', type: 'int' },
        { name: 'transport', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'length', type: 'int' },
        { name: 'requires_money', type: 'boolean' },
        { name: 'difficulty', type: 'int' },
        { name: 'map', type: 'string' },
        { name: 'time', type: 'string' },
      ]),
    ];
  }
  down() {
    return [
      this.dropTable('trails'),
    ];
  }
}

module.exports = CreateTrails;
