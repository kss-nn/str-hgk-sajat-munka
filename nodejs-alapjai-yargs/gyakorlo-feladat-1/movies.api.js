const { readFile, writeFile } = require('fs').promises

const MoviesApi = (path, property) => ({
  async get () {
    const dataString = await readFile(path)
    return JSON.parse(dataString)[property]
  },

  async save (data) {
    await writeFile(path, JSON.stringify({ [property]: data }))
  }
})

module.exports = MoviesApi
