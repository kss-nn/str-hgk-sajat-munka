const { createReadStream, createWriteStream, writeFile } = require('fs')
const { basename, extname } = require('path')
const Logger = require('./Logger')

const logger = new Logger()

const modifyTextFile = (filePath) => {
  try {
    // Copy file
    const readableStream = createReadStream(filePath, { encoding: 'utf-8' })
    const newFilePath = `./${basename(filePath, extname(filePath))}Copy${extname(filePath)}`
    const writeableStream = createWriteStream(newFilePath)
    readableStream.pipe(writeableStream)

    // Capitalize the first letter of each word
    readableStream.on('data', (chunk) => {
      writeFile(
        newFilePath,
        chunk.split(' ').map((word) => {
          return word[0].toUpperCase() + word.substring(1)
        }).join(' '),
        (err) => { if (err) throw err }
      )
    })
    logger.success('File transform successful.')
  } catch (err) {
    logger.error(err.message)
  }
}

module.exports = modifyTextFile
