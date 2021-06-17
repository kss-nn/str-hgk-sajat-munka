const modifyTextFile = require('./TextFileModifier')
const Logger = require('./Logger')
const logger = new Logger()

logger.on('modify', modifyTextFile)
logger.emit('modify', './mackomese.txt')
