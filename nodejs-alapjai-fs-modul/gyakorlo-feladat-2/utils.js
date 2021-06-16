const { createReadStream, createWriteStream, unlink } = require('fs')
const { basename } = require('path')
const { createGzip } = require('zlib')

const makeFileCompressed = (filePath) => {
  const readableStream = createReadStream(filePath, { encoding: 'utf-8' })
  const writeableStream = createWriteStream(`./${basename(filePath)}.bak`)
  const createCompressedFile = createWriteStream(`./${basename(filePath)}.bak.gz`)
  readableStream.pipe(writeableStream)

  readableStream
    .pipe(createGzip())
    .pipe(createCompressedFile)

  unlink(filePath, (err) => { if (err) throw err })
  unlink(`./${basename(filePath)}.bak`, (err) => { if (err) throw err })
}

module.exports = makeFileCompressed
