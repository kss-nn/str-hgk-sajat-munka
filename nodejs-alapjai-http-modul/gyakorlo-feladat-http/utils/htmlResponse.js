const { createReadStream} = require('fs')
const { join } = require('path')

const htmlResponse = (response, file, statusCode = 200) => {
    response.writeHead(statusCode, {
        'Content-Type': 'text/html'
    })
    createReadStream(join(__dirname, `../views/${file}.html`)).pipe(response)
}

module.exports = htmlResponse
