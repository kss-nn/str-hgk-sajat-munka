const { access, mkdir, writeFile } = require('fs').promises

const createStarterFolderStructure = () => {
  access('controllers')
    .catch(() => mkdir('controllers'))
    .then(() => writeFile('./controllers/site.controller.js', ''))
    .then(() => access('routers'))
    .catch(() => mkdir('routers'))
    .then(() => writeFile('./routers/site.router.js', ''))
    .then(() => access('views'))
    .catch(() => mkdir('views'))
    .then(() => writeFile('./views/index.html', ''))
    .then(() => writeFile('./app.js', ''))
    .catch((err) => console.log('\x1b[31m', err.message))
}

module.exports = createStarterFolderStructure
