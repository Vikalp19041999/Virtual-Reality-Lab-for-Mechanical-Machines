const express = require('express')
const bodyParser = require('body-parser')
// Import MongoDB
const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Home", { useNewUrlParser: true })
  .then(() => console.log('🔥  MongoDB Connected...'))
  .catch(err => console.log(err))

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/admin', require('./admin'))
app.use('/faculty', require('./faculty'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🔥  Server started on PORT: ${PORT}`)
})