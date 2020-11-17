if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  username: '廣志',
  email: 'user@root.com',
  password: '1234'
}

db.once('open', () => {
  console.log('MongoDB connected recordSeeder!')
  const createUserPromises = []

  const { username, email } = SEED_USER
  createUserPromises.push(
    User.find({ email: SEED_USER.email })
      .then(user => {
        if (user.length !== 0) {
          return
        }
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => {
            return User.create({ username, email, password: hash })
          })
      })
  )
  Promise.all(createUserPromises).then(() => {
    const createRecordPromise = []
    createRecordPromise.push(
      User.findOne({ email })
        .then(user => {
          const userId = user._id
          return Record.create(
            {
              name: '早餐',
              category: '餐飲食品',
              date: Date.now(),
              amount: 120,
              merchant: '全家便利商店',
              icon: '<i class="fas fa-utensils"></i>',
              userId
            },
            {
              name: '午餐',
              category: '餐飲食品',
              date: Date.now(),
              amount: 300,
              merchant: '麥當勞',
              icon: '<i class="fas fa-utensils"></i>',
              userId
            },
            {
              name: '電影',
              category: '休閒娛樂',
              date: Date.now(),
              amount: 250,
              merchant: '威尼斯影城',
              icon: '<i class="fas fa-grin-beam"></i>',
              userId
            }
          )
        })
    )
    Promise.all(createRecordPromise).then(item => {
      process.exit()
    })
  })
})
