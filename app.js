const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
// middlewares
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
// app.use(() => console.log('iwyroiqwyruoqiwygr'))
// try to find routes at contactsRouter
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'укшгпдцшугкнапдцшуг ' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
