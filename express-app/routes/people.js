'use strict';

const express = require('express');
const router = express.Router();
const peopleModel = require('../models/peopleModel');

// handle the URL /people
router.get('/', function(req, res, next) {

  let peopleList;
  peopleModel.getAll(req.app.get('api path'), function (peopleList) {
    res.render('people',
               { title: 'People',
                 people: peopleList});
  });
});

// handle the URL /people/new
router.get('/new', function(req, res, next) {
    res.render('person-new',
               { title: 'New Person'});
});

// handle the URL /people/create
router.get('/create', function(req, res, next) {
  peopleModel.create(req.query.firstName, req.query.lastName, req.app.get('api path'), function () {
    res.redirect('/people');
  });
});

// handle the URL /people/1234
router.get('/:personId', function(req, res, next) {

  let person;
  peopleModel.getById(req.params.personId, req.app.get('api path'), function (person) {
    res.render('person',
               { title: 'Person Detail',
                 person: person});
  });
});


module.exports = router;
