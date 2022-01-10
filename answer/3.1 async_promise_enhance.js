const { users, restaurants } = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list_async_promise_enhance')
const db = mongoose.connection

// 連接資料庫: db.once('open', callback)
// promise是ES6提供來解決callback function造成callback hell的方法，
// promise all裡面放置一個array，可包含多個promise，
// 保證所有promise程序都執行完畢後，才會執行promise.all後面的.then的程序
db.once('open', () => {
  Promise.all(
    users.map((user, user_index) => {
      // 創建使用者資料(user): model.create
      return UserModel.create({
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
        // 對每個user建立相對應餐廳資料
        return RestaurantModel.create(userRestaurant)
      })
    })
  ).then(() => {
    // 等待所有使用者的餐廳資料創建完成
    console.log('所有使用者與餐廳資料創建完成')
    process.exit()
  }).catch(error => {
    console.log(error)
  })
})
