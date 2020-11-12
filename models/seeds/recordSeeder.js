
const Record = require('../record')
const db = require('../../config/mongoose')
db.once('open', () => {
  console.log('Mongoodb  category connected ')
  const promise = []

  promise.push(
    Record.create(
      {
        name: '火鍋',
        category: '餐飲食品',
        date: '2019-04-23',
        amount: '638',
        icon: '<i class="fas fa-utensils"></i>'
      },
      {
        name: '房租',
        category: '家居物業',
        date: '2019-04-23',
        amount: '3000',
        icon: '<i class="fas fa-home"></i>'
      },
      {
        name: '機票',
        category: '交通出行',
        date: '2020-04-13',
        amount: '14000',
        icon: '<i class="fas fa-shuttle-van"></i>'
      },
      {
        name: '電子遊藝場',
        category: '休閒娛樂',
        date: '2009-02-16',
        amount: '1200',
        icon: '<i class="fas fa-grin-beam"></i>'
      },
      {
        name: '賞鳥',
        category: '其他',
        date: '2019-04-23',
        amount: '700',
        icon: '<i class="fas fa-grin-beam"></i>'
      },
      {
        name: '買菸',
        category: '休閒娛樂',
        date: '2019-04-23',
        amount: '780',
        icon: '<i class="fas fa-grin-beam"></i>'
      }
    )
  )

  // 等 recordSeeder 同步建立
  Promise.all(promise).then(() => {
    db.close()
  })
})
