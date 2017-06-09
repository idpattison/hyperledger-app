'use strict';

const unirest = require('unirest');
const peopleModel = require('../models/peopleModel');

// this module has the model functions relating to 'properties'

// return all properties as an array
exports.getAll = function (apiPath, callback) {
  unirest.get(apiPath + '/api/LandTitle').end(function (response) {
    let propertyList = response.body;

    // do any enrichment here

    // get the list of people by calling the function in the 'people' model
    // add the owner names to the property list
    let peopleList;
    peopleModel.getAll(apiPath, function (peopleList) {

      for (let x = 0; x < propertyList.length; x++) {
        let owner = peopleList.find(function (person) {
          return ('resource:' + person.$class + '#' + person.personId == propertyList[x].owner)
        });
        propertyList[x].ownerName = owner.firstName + ' ' + owner.lastName;
      }

      callback(propertyList);
    });

  });
}

// return the property identified by 'id'
exports.getById = function (id, apiPath, callback) {
  unirest.get(apiPath + '/api/LandTitle/' + id).end(function (response) {
    let property = response.body;
    // do any enrichment here

    // get the list of people by calling the function in the 'people' model
    // add the owner name to the property
    let peopleList;
    peopleModel.getAll(apiPath, function (peopleList) {

      let owner = peopleList.find(function (person) {
        return ('resource:' + person.$class + '#' + person.personId == property.owner);
      });
      property.ownerName = owner.firstName + ' ' + owner.lastName;

      callback(property);
    });

  });
}

// create a new property
exports.create = function (owner, information, apiPath, callback) {
  const property = {
    "$class": "net.biz.digitalPropertyNetwork.LandTitle",
    "titleId": "LID:" + Math.trunc(Math.random() * 10000),
    "owner": "resource:net.biz.digitalPropertyNetwork.Person#" + owner,
    "information": information
  };
  unirest.post(apiPath + '/api/LandTitle/')
    .headers({'Accept': 'application/json', 'Content-type': 'application/json'})
    .send(property)
    .end(function (response) {
      console.log(response.body);
      callback();
    });

}

// mark the identified property as 'for sale'
exports.sell = function (id, owner, apiPath, callback) {
  const trx = {
    "$class": "net.biz.digitalPropertyNetwork.RegisterPropertyForSale",
    "seller": owner,
    "title": "resource:net.biz.digitalPropertyNetwork.LandTitle#" + id,
    "timestamp": new Date().toISOString()
  };
  unirest.post(apiPath + '/api/RegisterPropertyForSale/')
    .headers({'Accept': 'application/json', 'Content-type': 'application/json'})
    .send(trx)
    .end(function (response) {
      console.log(response.body);
      callback();
    });

}

// mark the identified property as not 'for sale'
exports.unsell = function (id, property, apiPath, callback) {
  const trx = {
    "$class": "net.biz.digitalPropertyNetwork.LandTitle",
    "title": id,
    "owner": property.owner,
    "information": property.information,
    "forSale": false
  };
  console.log(trx);
  unirest.put(apiPath + '/api/landTitle/' + id)
    .headers({'Accept': 'application/json', 'Content-type': 'application/json'})
    .send(trx)
    .end(function (response) {
      console.log(response.body);
      callback();
    });

}
