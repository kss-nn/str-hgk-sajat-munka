const express = require('express');
const router = express.Router();
const database = require('../database/person');
const fsp = require('fs').promises;
const createError = require('http-errors');

let vaccinatedList = database.filter(person => person.vaccine != 'none');

/* GET all people. */
router.get('/', (req, res, next) => {
  res.send(database);
});

/* GET number of vaccinated people. */
router.get('/count', (req, res, next) => {
  let numberOfVaccinated = vaccinatedList.length;
  res.send(`A beoltott személyek száma: ${numberOfVaccinated} fő`);
});

/* GET data of vaccinated people. */
router.get('/vaccinated', (req, res, next) => {
  res.send(`A beoltott személyek adatai:<br /><br />${JSON.stringify(vaccinatedList)}`);
});

/* GET people by vaccine. */
router.get('/:vaccine', (req, res) => {
  const { vaccine } = req.params;
  const result = database.filter(person => person.vaccine === vaccine.charAt(0).toUpperCase() + vaccine.slice(1));
  res.json(result);
});

/* GET one person. */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const person = database.find(person => person.id === parseInt(id));
 
  if (!person) {
       return next(new createError.NotFound('Person not found!'));
  };

  res.send(person);
});

// Update a person
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = database.findIndex(person => person.id === parseInt(id));
  const { firstName, lastName, vaccine } = req.body;

  database[index] = {
    id: Number(id),
    firstName,
    lastName,
    vaccine
  };

  res.json(database[index]);
});

// Update a person with vaccination info
router.put('/:id/:vaccine', (req, res, next) => {
  const { id, vaccine } = req.params;
  const index = database.findIndex(person => person.id === parseInt(id));
  const person = database.find(person => person.id === parseInt(id));

  if (!person) {
    return next(new createError.NotFound('Person not found!'));
  };

  if (!firstName || lastName || !vaccine) {
    return next(new createError.BadRequest('Missing property!'));
  };

  database[index] = {
    id: Number(id),
    firstName: person.firstName,
    lastName: person.lastName,
    vaccine: vaccine.charAt(0).toUpperCase() + vaccine.slice(1)
  };

  res.json(database[index]);
});

// GET vaccination info about a person.
router.get('/:id/vaccinated', (req, res, next) => {
  const { id } = req.params;
  const person = database.find(person => person.id === parseInt(id));
 
  if (!person) {
       return next(new createError.NotFound('Person not found!'));
  };

  res.send(`${person.firstName + ' ' + person.lastName}<br />
    <strong>${person.vaccine != 'none' ? 'Be van oltva.' : 'Nincs beoltva.'}</strong>`);
});

// POST new person into database.
router.post('/', (req, res, next) => {

  const { firstName, lastName, vaccine } = req.body;

  if (!firstName || !lastName || !vaccine) {
    return next(new createError.BadRequest('Missing property!'));
  }

  const newPerson = req.body;
  newPerson.id = database[database.length - 1].id + 1;
  database.push(newPerson);

  fsp.writeFile('../database/person.json', JSON.stringify(database));
  
  res.status(201);
  res.json(newPerson);
});

// // Delete a person
// router.delete('/:id', (req, res) => {
//   const index = database.findIndex(person => person.id === Number(req.params.id));
// 	database.splice(index, 1);
// 	res.json({});
// });

// Delete all person base on vaccine type
router.delete('/:vaccine', (req, res, next) => {
  const { vaccine } = req.params;
  const result = database.filter(person => person.vaccine !== vaccine.charAt(0).toUpperCase() + vaccine.slice(1));

  if (!vaccine) {
    return next(new createError.NotFound('Vaccine not found.'));
  }

  database.splice(0, database.length);
  database.push(result);
  
  res.json(result);
});

module.exports = router;
