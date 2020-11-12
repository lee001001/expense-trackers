const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find({ name: { $regex: '' } })
    .lean()
    .then(record => {
      let totalAmount = 0
      const promise = []
      for (let i = 0; i < record.length; i++) {
        promise.push(record[i])
        totalAmount += Number(promise[i].amount)
      }
      res.render('index', { record, totalAmount })
    })
    .catch(error => console.log(error))
})
module.exports = router
