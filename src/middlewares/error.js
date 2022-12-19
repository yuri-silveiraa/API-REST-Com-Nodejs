
const errorHandler = ({ log = console.error } = {}) =>
  (error, _req, res, _next) => {
    log(error)
    const { status, body } = errorToResponse(error)
    res.status(status).send(body)
  }

module.exports = errorHandler
