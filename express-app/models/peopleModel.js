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

// return the property identified by 'id'
exports.getById = function (id, apiPath, callback) {
  unirest.get(apiPath + '/api/Person/' + id).end(function (response) {
    let person = response.body;
    // do any enrichment here
    callback(person);
  });
}

// create a new property
exports.create = function (firstName, lastName, apiPath, callback) {
  const person = {
    "$class": "net.biz.digitalPropertyNetwork.Person",
    "personId": "PID:" + Math.trunc(Math.random() * 10000),
    "firstName": firstName,
    "lastName": lastName
  };
  unirest.post(apiPath + '/api/Person/')
    .headers({'Accept': 'application/json', 'Content-type': 'application/json'})
    .send(person)
    .end(function (response) {
      console.log(response.body);
      callback();
    });

}
