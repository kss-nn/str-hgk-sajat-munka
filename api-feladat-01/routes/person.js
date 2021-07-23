const express = require('express');
const router = express.Router();
const database = require('../database/person');

let vaccinatedList = database.filter(person => person.vaccine != 'none');

/* GET number of vaccinated people. */
router.get('/count', (req, res, next) => {
  let numberOfVaccinated = vaccinatedList.length;
  res.send(`A beoltott személyek száma: ${numberOfVaccinated} fő`);
});

/* GET data of vaccinated people. */
router.get('/vaccinated', (req, res, next) => {
  res.send(`A beoltott személyek adatai:<br /><br />${JSON.stringify(vaccinatedList)}`);
});

module.exports = router;
