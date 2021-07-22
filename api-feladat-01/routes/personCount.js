const express = require('express');
const router = express.Router();
const database = require('../database/person');

/* GET number of vaccinated people. */
router.get('/', (req, res, next) => {
  let vaccinatedList = database.filter(person => person.vaccine != 'none');
  let numberOfVaccinated = vaccinatedList.length;
  res.send(`A beoltott személyek száma: ${numberOfVaccinated} fő`);
});

module.exports = router;
