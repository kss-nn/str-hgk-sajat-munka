// 2/a feladat
const isAdult = (user) => {
  if (user.age >= 18) {
    user.isAdult = true
  } else {
    user.isAdult = false
  }
}

const generateUserList = (users = [{ firstName: '', lastName: '', age: 0 }]) => {
  users.map(user => {
    user.fullName = `${user.lastName}, ${user.firstName}`
    isAdult(user)
    delete user.firstName
    delete user.lastName
    delete user.age
    return user
  })
  return users
}

// const user1 = { firstName: 'John', lastName: 'Doe', age: 30 }
// const user2 = { firstName: 'Jane', lastName: 'Doe', age: 32 }
// const user3 = { firstName: 'István', lastName: 'Kovács', age: 18 }
// const user4 = { firstName: 'Szandra', lastName: 'Török', age: 14 }

// const sampleUsers = [user1, user2, user3, user4]

// console.log('2/a, generateUserList():', generateUserList(sampleUsers))

// 2/b feladat
const getUserNames = (users = [{ firstName: '', lastName: '', age: 0 }]) => {
  let userNames = []
  users.forEach(user => {
    userNames.push(user.fullName)
  })
  userNames = userNames.join('; ')
  return userNames
}

// console.log('2/b, getUserNames():', getUserNames(sampleUsers))

// 2/c feladat
module.exports = Object.freeze({
  generateUserList,
  getUserNames
})
