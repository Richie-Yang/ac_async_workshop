users =  [ user1, user2 ]

restaurants = [ rest1, rest2, rest3, rest4, rest5, rest6 ]

連接資料庫('資料庫名稱')

等待資料庫連接成功(100)

function 對每一個user進行處理 (user) {
  創建使用者資料(user)
  等待創建使用者資料完成(100)

  function 對每個user與restaurant進行處理 (restaurant){
    對每個user建立相對應餐廳資料(restaurant, user)
    等待創建餐廳資料完成(100)
  }(restaurant of restaurants)

} (user of users)

等待所有使用者的餐廳資料創建完成(100) 
console.log('所有使用者與餐廳資料創建完成')