if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const recordsExpense = require('../seeds/data/records.json')

const SEED_USER = {
  username: '廣志',
  email: 'user@root.com',
  password: '1234'
}

db.once('open', () => {
  console.log('MongoDB connected recordSeeder!')

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({ username: SEED_USER.username, email: SEED_USER.email, password: hash }))
    .then(userId => {
      return Promise.all(Array.from(
        { length: recordsExpense.records.length },
        (_, i) => Category
          .findOne({ name: recordsExpense.records[i].category })
          .then(category => Record.create({
            userId,
            name: recordsExpense.records[i].name,
            category: category._id,
            date: new Date(recordsExpense.records[i].date),
            amount: recordsExpense.records[i].amount,
            merchant: recordsExpense.records[i].merchant
          })
          )
      ))
    })
    .then(() => {
      console.log('Done')
      // process.exit() 指「關閉這段 Node 執行程序」
      process.exit()
    })
})
