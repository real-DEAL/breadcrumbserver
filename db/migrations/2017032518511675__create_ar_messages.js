'use strict';

const Nodal = require('nodal');

class CreateArMessages extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017032518511675;
  }

  up() {
    return [
      this.createTable('ar_messages',
        [{ name: 'username', type: 'string' },
        { name: 'message', type: 'text' },
      { name: 'bearing', type: 'int' },
      { name: 'crumb_id', type: 'int' }]),
    ];
  }
  down() {
    return [
      this.dropTable('ar_messages'),
    ];
  }

}

module.exports = CreateArMessages;
