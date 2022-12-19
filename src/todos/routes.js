const { Router } = require('express')
const { TodosRepository } = require('./repository')

const router = Router()

const todosRepository = TodosRepository()

const NotFound = {
  error: 'Not Found',
  message: 'Resource not found'
}

//GET /todos

router.get('/', (_req, res) => {
  todosRepository
    .list()
    .then(todos => res.status(200).send({ todos }))
})

//GET /todos/:id
router.get('/:id', async (req, res) =>{
  const id = parseInt(req.params.id)
  const todo = await todosRepository.get(id)
  if (!todo) {
    res.status(404).send(NotFound)
    return
  }
  res.status(200).send(todo)
})

// POST /todos
router.post('/todos', async (req, res) =>{
  const todo = req.body
  const inserted = await todosRepository.insert(todo)

  res
    .status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
})

// PUT /todos/:id
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = { ...req.body, id }

  const found = await todosRepository.get(id)
  if (!found) {
    res.status(404).send(NotFound)
    return
  }
  const updated = await todosRepository.update(todo)
  res.status(200).send(updated)
})

// DELETE /todos/:id
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const found = await todosRepository.get(id)
  if (!found) {
    res.status(404).send(NotFound)
    return
  }
  await todosRepository.del(id)
  res.status(204).send()
})

module.exports = router
