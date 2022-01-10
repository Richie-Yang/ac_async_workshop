services =  ['帶位', '點餐', '煮菜', '出菜', '結帳']
staffs = ['老闆']
clients = ['client1', 'client2', 'client3']

function 對每一個client進行處理 (client) {
function 對client循序給予services處理 (service){
  if(service === '帶位') {
    帶位(staffs[0], client);
  } else if(service === '點餐') {
    點餐(staffs[0], client);
  } else if(service === '煮菜') {
    煮菜(staffs[0], client);
  } else if(service === '出菜') {
    出菜(staffs[0], client);
  } else if(service === '結帳') {
    結帳(staffs[0], client);
  }
  }(service of services)
} (client of clients)

console.log('所有客人的餐點服務全部完成')