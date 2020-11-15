const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  const username = req.user.username
  const categories = ['餐飲食品', '休閒娛樂', '家居物業', '交通出行', '其他']
  // Set default date range
  const date = new Date()
  date.setDate(1)
  const startDate = date.toISOString().slice(0, 10)
  date.setDate(30)
  const endDate = date.toISOString().slice(0, 10)

  Record.find({ name: { $regex: '' }, userId, date: { $gte: startDate, $lte: endDate } })
    .lean()
    .then(record => {
      let totalAmount = 0
      const promise = []
      for (let i = 0; i < record.length; i++) {
        promise.push(record[i])
        totalAmount += Number(promise[i].amount)
      }
      console.log(req.query)
      res.render('index', { record, totalAmount, startDate, endDate, username })
    })
    .catch(error => console.log(error))
})
module.exports = router
