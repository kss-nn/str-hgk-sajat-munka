// 2/d feladat
const utils = require('./utils')

// 2/e feladat
const user1 = { firstName: 'John', lastName: 'Doe', age: 30 }
const user2 = { firstName: 'Jane', lastName: 'Doe', age: 32 }
const user3 = { firstName: 'István', lastName: 'Kovács', age: 18 }
const user4 = { firstName: 'Szandra', lastName: 'Török', age: 14 }

const sampleUsers = [user1, user2, user3, user4]

console.log('2/e, generateUserList():', utils.generateUserList(sampleUsers))
console.log('2/e, getUserNames():', utils.getUserNames(sampleUsers))

// 2/f feladat
utils.generateUserList = () => {}
console.log('2/f, tried to modify:', utils.generateUserList(sampleUsers))
utils.getUserNames = () => {}
console.log('2/f, tried to modify:', utils.getUserNames(sampleUsers))
