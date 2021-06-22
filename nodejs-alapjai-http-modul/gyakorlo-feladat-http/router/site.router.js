const siteController = require("../controller/site.controller")

const siteRouter = {
    '/': response => siteController.index(response),
    '/about': response => siteController.about(response),
    '/contact': response => siteController.contact(response),
    '/404': response => siteController.error404(response)
}

module.exports = Object.freeze(siteRouter)
