// 'use strict';

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
        { name: 'rating', type: 'int' },
        { name: 'transport', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'length', type: 'string' },
        { name: 'requires_money', type: 'boolean' },
        { name: 'difficulty', type: 'int' },
        // TODO: find a way to integrate these two
        // { name: 'start_crumb', type: 'int' },
        // { name: 'end_crumb', type: 'int' },
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
