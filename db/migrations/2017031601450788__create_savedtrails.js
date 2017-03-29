'use strict';

const Nodal = require('nodal');

class CreateSavedtrails extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017031601450788;
  }

  up() {
    return [
      this.createTable('savedtrails', [
        { name: 'user_id', type: 'int' },
        { name: 'trail_id', type: 'int' },
        { name: 'position', type: 'int' },
        { name: 'time_start', type: 'string' },
        { name: 'time_finished', type: 'string' }]),
    ];
  }
  down() {
    return [
      this.dropTable('savedtrails'),
    ];
  }

}

module.exports = CreateSavedtrails;
