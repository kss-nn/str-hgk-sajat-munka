const http = require('http')
const siteRouter = require('./router/site.router')

const port = 8080

http.createServer(({ url }, response) => {
  siteRouter[url] ? siteRouter[url](response) : siteRouter['/404'](response)
})
.on('error', err => console.log(`Server error: ${err.message}`))
.on('listening', () => {
  console.log(`Server is running at http://127.0.0.1:${port}`)
})
.on('request', ({ url, method }) => {
  const date = new Date()
  console.log(
    `New HTTP request.
    Request time: ${date.toLocaleDateString('hu')} ${date.toLocaleTimeString('hu')}
    URL: http://127.0.0.1:${port}${url}
    Method: ${method}`)
})
.listen(port)


