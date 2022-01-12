const { users, restaurants } = require('./data')
const RestaurantModel = require('./restaurant')
const UserModel = require('./user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list_async_promise')
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
        // 對每個user建立相對應餐廳資料
        restaurantArray = []
        restaurants.forEach((item, index) => {
          if (index >= user_index * 3 && index < (user_index + 1) * 3) {
            item.userId = user._id
            console.log(`前置餐廳${index}已經成功置入使用者${user_index}`)
            restaurantArray.push(item)
          }
        })

        return RestaurantModel.create(restaurantArray)
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
