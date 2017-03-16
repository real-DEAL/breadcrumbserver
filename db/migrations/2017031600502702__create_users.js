// 'use strict';

const Nodal = require('nodal');

class CreateUsers extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017031600502702;
  }

  up() {
    return [
      this.createTable('users', [
        { name: 'email',
          type: 'string',
          properties:
          { unique: true } },
          { name: 'points', type: 'int' },
          { name: 'total_completed', type: 'int' },
          { name: 'current_trail', type: 'int' },
          { name: 'password', type: 'string' },
          { name: 'username', type: 'string' },
          { name: 'profile_picture', type: 'string' },
      ]),
    ];
  }

  down() {
    return [
      this.dropTable('users'),
    ];
  }

 }

module.exports = CreateUsers;
