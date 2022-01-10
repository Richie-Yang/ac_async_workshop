const { users, restaurants } = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list_async_await')
const db = mongoose.connection

// 連接資料庫: db.once('open', callback)
// async await是ES7提供來解決promise閱讀起來還是並非按照從上而下的順序，而包裝promise後設計出來的功能
// async await可配合promise使用，但必須注意不能混用到.then
db.once('open', async () => {
  await Promise.all(
    users.map(async (user, user_index) => {
      // 創建使用者資料(user): model.create
      const createdUser = await UserModel.create({
        ...user
      })
      console.log('user created')

      // 對每個user建立相對應餐廳資料
      const userRestaurant = []
      restaurants.forEach((restaurant, rest_index) => {
        if (rest_index >= 3 * user_index && rest_index < 3 * (user_index + 1)) {
          restaurant.userId = createdUser._id
          userRestaurant.push(restaurant)
        }
      })
      await RestaurantModel.create(userRestaurant)
      console.log('restaurant created')
    })
  )
  // 等待所有使用者的餐廳資料創建完成
  console.log('所有使用者與餐廳資料創建完成')
  process.exit()
})
