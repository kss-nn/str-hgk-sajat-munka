const option = ({ alias, describe, type = 'number', demandOption = true } = {}) => ({
  alias,
  describe,
  type,
  demandOption
})

const id = option({
  alias: 'i',
  describe: 'Product ID'
})

const name = option({
  alias: 'n',
  describe: 'Product name',
  type: 'string'
})

const price = option({
  alias: 'p',
  describe: 'Product price'
})

const count = option({
  alias: 'c',
  describe: 'Product count'
})

module.exports = Object.freeze({
  id,
  name,
  price,
  count
})
