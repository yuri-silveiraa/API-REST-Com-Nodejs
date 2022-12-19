const { Router } = require('express')

const router = Router()

//GET hello
router.get('/', (_req, res) => {
  res.status(200).send('Hello World!\n')
})

//GET /hello/:name
router.get('/:name', (req, res) => {
  const name = req.params.name
  res.status(200).send(`Hello ${name}!\n`)
})

module.exports = router
