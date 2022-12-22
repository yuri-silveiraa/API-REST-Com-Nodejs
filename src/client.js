const fetch =  require('node-fetch')
const { AbortController } = require('abort-controller')


class HttpStatusError extends Error {
  constructor(body, status) {
    super(`Request failed with status ${status}`)
    this.name =
    this.body = body
    this.status = status
  }
}
const rejectHttpStatusError = res =>
  res
    .text()
    .then(body => new HttpStatusError({ body, status: res.status }))
    .then(error => Promise.reject(error))

const createUser = (user, timeout=10_000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  return fetch(
    'http://localhost:3000/api/users',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(user),
      signal: controller.signal,
    }
  )
  .finally(() => {
    clearTimeout(timeoutId)
  })
  .then(res =>
    !res.ok
      ? rejectHttpStatusError(res)
      : res
  )
  .then(res => res.json())
}
createUser({
  username: 'e@a.com',
  firstName: 'Nao',
  lastName: 'Importa',
  password: '1234567'
})
  .then((body) => console.log('Recebemos o body:\n', body))
  .then(console.log)
