const EventEmitter = require('events')

class Logger extends EventEmitter {
  error (str) {
    console.log('\x1b[31m', str)
  }

  success (str) {
    console.log('\x1b[32m', str)
  }
}

module.exports = Logger
