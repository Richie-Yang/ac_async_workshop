const { users, restaurants } = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list_async_promise')
const db = mongoose.connection

db.once('open', () => {
  new Promise((resolve, _reject) => {
    for (const [user_index, user] of users.entries()) {
      UserModel.create({
        ...user
      }).then((user) => {
        console.log('user created')
        const userRestaurant = []
        restaurants.forEach((restaurant, rest_index) => {
          if (rest_index >= 3 * user_index && rest_index < 3 * (user_index + 1)) {
            restaurant.userId = user._id
            userRestaurant.push(restaurant)
          }
        })
        return RestaurantModel.create(userRestaurant)
      }).then(() => {
        console.log('restaurant created')
        if (user_index >= users.length - 1) {
          resolve()
        }
      })
    }
  }).then(() => {
    // 等待所有使用者的餐廳資料創建完成
    console.log('所有使用者與餐廳資料創建完成')
    return Promise.resolve()
  }).then(() => {
    process.exit()
  })
})
