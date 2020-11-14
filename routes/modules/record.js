const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// creat route setting
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/create', (req, res) => {
  const body = req.body
  body.userId = req.user._id
  Record.find()
    .lean()
    .then(record => {
      const promise = []
      for (let i = 0; i < record.length; i++) {
        promise.push(record[i])
        if (body.category === '支出類別') { body.category = '其他' }
        if (body.merchant === '') { body.merchant = '其他' }
        if (body.category === promise[i].categoryName) { body.icon = promise[i].icon }
      }
      return Record.create(body)
    })
    .then(() => res.redirect('/'))
    .catch(() => console.log('error!'))
})

// create edit setting
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      record.date = record.date.toISOString().slice(0, 10)
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  req.body.amount = Number(req.body.amount)
  Record.find({ categoryName: req.body.category })
    .then(record => { req.body.icon = record[0].icon })
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(() => console.log('error!'))
})

// create delete rounte
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 篩選類別資料
router.get('/', (req, res) => {
  const userId = req.user._id
  const filter = req.query.filter
  const { startDate, endDate } = req.query
  if (filter.length === 0 || startDate.length === 0) return res.redirect('/')
  console.log(req.query)
  Record.find({
    userId,
    category: `${req.query.filter}`,
    date: { $gte: startDate, $lte: endDate }
  })
    .lean()
    .then(record => {
      let totalAmount = 0
      const promise = []
      for (let i = 0; i < record.length; i++) {
        record[i].date = record[i].date.toISOString().slice(0, 10)
        promise.push(record[i])
        totalAmount += Number(promise[i].amount)
      }
      res.render('index', { record, totalAmount, filter, startDate, endDate })
    })
    .catch(error => console.log(error))
})

module.exports = router
