const htmlResponse = require('../utils/htmlResponse')

const index = response => htmlResponse(response, 'index')
const about = response => htmlResponse(response, 'about')
const contact = response => htmlResponse(response, 'contact')
const error404 = response => htmlResponse(response, '404', 404)

module.exports = Object.freeze({
    index,
    about,
    contact,
    error404
})
