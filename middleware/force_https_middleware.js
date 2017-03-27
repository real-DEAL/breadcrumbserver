'use strict';
/* eslint no-underscore-dangle: ["error", { "allow": ["_path","_requestHeaders"] }]*/
const Nodal = require('nodal');

/* Forces HTTPS */

class ForceHTTPSMiddleware {

  static exec(controller, callback) {
    const headers = controller._requestHeaders;
    const host = headers.host || '';
    if (headers.hasOwnProperty('x-forwarded-proto') &&
        headers['x-forwarded-proto'] !== 'https') {
      controller.redirect(`https://${host}${controller._path}`);
      return;
    }
    callback(null);
  }
}

module.exports = ForceHTTPSMiddleware;
