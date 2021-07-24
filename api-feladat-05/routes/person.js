const express = require('express');
const router = express.Router();
const database = require('../database/person');
const fsp = require('fs').promises;
const createError = require('http-errors');
const Person = require('../database/person.schema');

// let vaccinatedList = database.filter(person => person.vaccine != 'none');

/* GET all people. */
router.get('/', async (req, res, next) => {
  const people = await Person.find();
  res.json(people);
});

/* GET number of vaccinated people. */
router.get('/count', async (req, res, next) => {
  const numberOfVaccinated = await Person.countDocuments({vaccine: {$ne: 'none'}});
  res.send(`A beoltott személyek száma: ${numberOfVaccinated} fő`);
});

/* GET data of vaccinated people. */
router.get('/vaccinated', async (req, res, next) => {
  const peopleVaccinated = await Person.find({vaccine: {$ne: 'none'}});
  res.send(`A beoltott személyek adatai:<br /><br />${JSON.stringify(peopleVaccinated)}`);
});

/* GET people by vaccine. */
router.get('/:vaccine', async (req, res, next) => {
  const { vaccine } = req.params;
  const result = await Person.find({vaccine: {$eq: vaccine.charAt(0).toUpperCase() + vaccine.slice(1)}});
  res.json(result);
});

/* GET one person. */
router.get('/:id', async (req, res, next) => {
  const person = await Person.findById(req.params.id);

	if (!person) {
		return next(new createError.NotFound('Person is not found!'));
	};
		    
	res.json(person);
});

// Update a person
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, vaccine } = req.body;

  if (!firstName || !lastName || !vaccine) {
    return next(new createError.BadRequest('Missing property!'));
  };

  const update = {
    firstName: firstName,
    lastName: lastName,
    vaccine: vaccine
  };

  let person = {};
  try {
    person = await Person.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: false
    });
  } catch (error) {
    return next(new createError.BadRequest(error));
  };

  return res.json(person);
});

// Update a person with vaccination info
router.put('/:id/:vaccine', async (req, res, next) => {
  const { id, vaccine } = req.params;
  const person = await Person.findById(id);

  if (!person) {
    return next(new createError.NotFound('Person not found!'));
  };

  if (!person.firstName || !person.lastName  || !vaccine) {
    return next(new createError.BadRequest('Missing property!'));
  };

  const update = {
    firstName: person.firstName,
    lastName: person.lastName,
    vaccine: vaccine.charAt(0).toUpperCase() + vaccine.slice(1)
  };

  let personUpdated = {};
  
  try {
    personUpdated = await Person.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: false
    });
  } catch (error) {
      return next(new createError.BadRequest(error));
  };

  return res.json(personUpdated);
});

// GET vaccination info about a person.
router.get('/:id/vaccinated', async (req, res, next) => {
  const { id } = req.params;
  const person = await Person.findById(id);
 
  if (!person) {
       return next(new createError.NotFound('Person not found!'));
  };

  res.send(`${person.firstName + ' ' + person.lastName}<br />
    <strong>${person.vaccine != 'none' ? 'Be van oltva.' : 'Nincs beoltva.'}</strong>`);
});

// POST new person into database.
router.post('/', async (req, res, next) => {
  const { firstName, lastName, vaccine } = req.body;
  const people = await Person.find();

  if (!firstName || !lastName || !vaccine) {
    return next(new createError.BadRequest('Missing property!'));
  };

  const newPerson = req.body;
  people.push(newPerson);
  
  res.status(201);
  res.json(newPerson);
});

/* // Delete a person
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  let person = {};

  try {
    person = await Person.findByIdAndDelete(id);
  } catch (error) {
    return next(new createError.NotFound(error));
  };

  res.json({});
}); */

// Delete all person base on vaccine type
router.delete('/:vaccine', async (req, res, next) => {
  const { vaccine } = req.params;
  let people = {};

  try {
    people = await Person.deleteMany({vaccine: {$eq: vaccine.charAt(0).toUpperCase() + vaccine.slice(1)}});
  } catch (error) {
    return next(new createError.NotFound(error));
  };

  res.json({});
});

module.exports = router;
