const yargs = require('yargs')
const { count } = require('./option')
const { dbFilePath, propertyName, currency } = require('./config')
const ProductsApi = require('./products.api')
const ProductsService = require('./products.service')

const productsApi = ProductsApi(dbFilePath, propertyName, currency)

const {
  calculateSum,
  calculateAverage,
  lessthan
} = ProductsService(productsApi)

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'sum',
    describe: 'Sum all prices of all products',
    handler: async () => console.log('Sum:', calculateSum().toLocaleString(), currency)
  })
  .command({
    command: 'avg',
    describe: 'Calculates the average price of all products',
    handler: async () => console.log('Average price:', calculateAverage().toFixed(0).toLocaleString(), currency, '/product')
  })
  .command({
    command: 'lessthan',
    describe: 'Lists products with quantity less than a given number. Give number in this format: -c=1',
    builder: { count },
    handler: async (args) => console.log(await lessthan(args.count))
  })
  .locale('en')
  .strict()
  .help()
  .parse()
