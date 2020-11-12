// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// const Record = require('./models/record')
const routes = require('./routes')
require('./config/mongoose')
const port = 3000

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use((bodyParser.urlencoded({ extended: true })))
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.use(routes)
// home routes setting

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
