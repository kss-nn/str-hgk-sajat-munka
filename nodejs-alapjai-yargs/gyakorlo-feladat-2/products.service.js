const ProductsService = (productsApi) => {
  const products = productsApi.get()

  const calculateSum = () => {
    let total = 0
    products.map(product => {
      total += (product.count * product.price)
      return total
    })
    return total
  }

  const calculateAverage = () => {
    let average = 0
    products.map(product => {
      average = (average += product.price * product.count) / products.length
      return average
    })
    return average
  }

  const lessthan = (count) => {
    return products.filter(product => product.count < count)
  }

  return {
    calculateSum,
    calculateAverage,
    lessthan
  }
}

module.exports = ProductsService
