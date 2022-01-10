const { users, restaurants } = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list_async_await')
const db = mongoose.connection

async function generateData (user, index_one, index_two) {
  await UserModel.create({
    ...user
  }).then(async user => {
    const userId = user._id
    const restaurantsForUser = restaurants.slice(index_one, index_two).map(restaurant => {
      restaurant.userId = userId
      return restaurant
    })
    await RestaurantModel.create(restaurantsForUser)
      .then(() => {
        console.log('done')
      })
      .catch(err => {
        console.log(err)
      })
  }).catch(err => {
    console.log(err)
  })
}

async function generateDatas () {
  await generateData(users[0], 0, 3)
  await generateData(users[1], 3, 6)
  process.exit()
}
db.once('open', () => {
  generateDatas()
})
