const { users, restaurants } = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list_async_await')
const db = mongoose.connection

function generateData (user, index_one, index_two) {
  db.once('open', () => {
    UserModel.create({
      ...user
    }).then(user => {
      const userId = user._id
      const restaurantsForUser = restaurants.slice(index_one, index_two).map(restaurant => {
        restaurant.userId = userId
        return restaurant
      })
      return RestaurantModel.create(restaurantsForUser)
    })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
}

generateData(users[0], 0, 3)
generateData(users[1], 3, 6)
