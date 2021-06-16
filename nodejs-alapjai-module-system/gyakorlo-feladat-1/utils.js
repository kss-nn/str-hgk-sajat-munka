// 1/a feladat
const increaseDate = (date, number = 3) => {
  date.setDate(date.getDate() + number)
  return date
}

// const sampleDate = new Date()
// console.log('1/a, increaseDate():', increaseDate(sampleDate))

// 1/b feladat
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  date = date.toLocaleDateString('hu', options)
  return date
}

// const sampleDate2 = new Date()
// console.log('1/b, formatDate():', formatDate(sampleDate2))

const increaseAndFormatDate = (dates = []) => {
  dates.forEach(item => increaseDate(item))
  dates = dates.map(item => formatDate(item))
  return dates
}

// const sampleDates = [new Date('2019-10-08T11:50:10'), new Date('2021-02-19T18:32:00'), new Date()]
// console.log('1/b, increaseAndFormatDate():', increaseAndFormatDate(sampleDates))

// 1/c feladat
module.exports = { dateFormatter: increaseAndFormatDate }
