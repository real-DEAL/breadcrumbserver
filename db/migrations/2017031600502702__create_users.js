'use strict';

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
          { name: 'score', type: 'int' },
          { name: 'total_completed', type: 'int' },
          { name: 'access_token', type: 'string' },
          { name: 'current_trail', type: 'int' },
          { name: 'password', type: 'string' },
        { name: 'username',
          type: 'string',
          properties:
            { unique: true } },
          { name: 'profile_picture', type: 'string' },
          { name: 'social_login', type: 'string' },
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
