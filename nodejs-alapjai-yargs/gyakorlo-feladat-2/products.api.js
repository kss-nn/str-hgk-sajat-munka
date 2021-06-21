const { readFileSync, writeFileSync } = require('fs')

const ProductsApi = (path, property) => ({
  get () {
    const dataString = readFileSync(path)
    return JSON.parse(dataString)[property]
  },

  save (data) {
    writeFileSync(path, JSON.stringify({ [property]: data }))
  }
})

module.exports = ProductsApi
