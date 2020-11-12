const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 寫入 category 和 icon
db.once('open', () => {
  console.log('Mongoodb  category connected ')
  const createRecordPromise = []

  createRecordPromise.push(
    Record.create(
      {
        categoryName: '家居物業',
        icon: '<i class="fas fa-home"></i>'
      },
      {
        categoryName: '交通出行',
        icon: '<i class="fas fa-shuttle-van"></i>'
      },
      {
        categoryName: '休閒娛樂',
        icon: '<i class="fas fa-grin-beam"></i>'
      },
      {
        categoryName: '餐飲食品',
        icon: '<i class="fas fa-utensils"></i>'
      },
      {
        categoryName: '其他',
        icon: '<i class="fas fa-pen"></i>'
      }
    )
  )

  // 等 recordSeeder 同步建立
  Promise.all(createRecordPromise).then(() => {
    db.close()
  })
})
