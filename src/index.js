const express = require('express')

const hello = require('./hello/routes')
const todos = require('./todos/routes')


const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(logger())
app.use('/hello', hello)
app.use('/todos', todos)

app.use(errorHandler())

app.use('/api', router)

app
  .listen(3000, '0.0.0.0', () => {
    console.log('Server started')
  })
  .once('error', (error) => {
    console.error(error)
    process.exit(1)
  })
