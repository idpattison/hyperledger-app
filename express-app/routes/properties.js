'use strict';

const express = require('express');
const router = express.Router();
const propertyModel = require('../models/propertiesModel');
const peopleModel = require('../models/peopleModel');

// handle the URL /properties
router.get('/', function(req, res, next) {

  let propertyList;
  propertyModel.getAll(req.app.get('api path'), function (propertyList) {

    res.render('properties',
               { title: 'Properties',
                 properties: propertyList});
  });
});

// handle the URL /properties/new
router.get('/new', function(req, res, next) {

  // get the list of people to populate the drop-down
  let peopleList;
  peopleModel.getAll(req.app.get('api path'), function (peopleList) {
    // TODO - sort the people list
    res.render('property-new',
               { title: 'New Property',
                 owners: peopleList});
  });
});

// handle the URL /properties/create
router.get('/create', function(req, res, next) {
  propertyModel.create(req.query.owner, req.query.information, req.app.get('api path'), function () {
    res.redirect('/properties');
  });
});

// handle the URL /properties/1234
router.get('/:propertyId', function(req, res, next) {

  let property;
  propertyModel.getById(req.params.propertyId, req.app.get('api path'), function (property) {

    const forSale = (property.forSale);
    res.render('property',
               { title: 'Property Detail',
                 property: property,
                 forSale: forSale});
  });
});

// handle the URL /properties/sell/1234
router.get('/sell/:propertyId', function(req, res, next) {

  let property;
  propertyModel.getById(req.params.propertyId, req.app.get('api path'), function (property) {

    propertyModel.sell(req.params.propertyId, property.owner, req.app.get('api path'), function () {
      res.redirect('/properties');
    });

  });
});

// handle the URL /properties/unsell/1234
router.get('/unsell/:propertyId', function(req, res, next) {

  let property;
  propertyModel.getById(req.params.propertyId, req.app.get('api path'), function (property) {

    propertyModel.unsell(req.params.propertyId, property, req.app.get('api path'), function () {
      res.redirect('/properties');
    });

  });
});


module.exports = router;
