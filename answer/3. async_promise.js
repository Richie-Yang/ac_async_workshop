const { users, restaurants } = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list_async_promise')
const db = mongoose.connection

// 連接資料庫: db.once('open', callback)
// promise是ES6提供來解決callback function造成callback hell的方法，
// 被包覆在promise內的function，會保證在呼叫resolve後才會執行.then裡面的程序，
// 避免callback會一直往下層寫，造成不好閱讀的程式碼
db.once('open', () => {
  new Promise((resolve, _reject) => {
    for (const [user_index, user] of users.entries()) {
      // 創建使用者資料(user): model.create
      UserModel.create({
        ...user
      }).then((user) => {
        console.log('user created')
        // 對每個user建立相對應餐廳資料
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
    process.exit()
  })
})
