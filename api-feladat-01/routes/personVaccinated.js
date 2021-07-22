const express = require('express');
const router = express.Router();
const database = require('../database/person');

/* GET data of vaccinated people. */
router.get('/', (req, res, next) => {
  let vaccinatedList = database.filter(person => person.vaccine != 'none');
  res.send(`A beoltott személyek adatai:<br /><br />${JSON.stringify(vaccinatedList)}`);
});

module.exports = router;
