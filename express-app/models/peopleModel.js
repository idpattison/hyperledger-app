'use strict';

const unirest = require('unirest');

// this module has the model functions relating to 'people'

// return all people as an array
exports.getAll = function (apiPath, callback) {
  unirest.get(apiPath + '/api/Person').end(function (response) {
    let peopleList = response.body;
    // do any enrichment here
    callback(peopleList);
  });
}
