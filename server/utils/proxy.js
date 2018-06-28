const baseUrl = require('./baseUrl')
const axios = require('axios')
const queryStr = require('query-string')

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  /** remove 'needAccessToken' from query string */
  let query = Object.assign({}, req.query, {
    accesstoken: needAccessToken && req.method === 'GET' ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: queryStr.stringify(Object.assign({}, req.body, {
      accesstoken: needAccessToken && req.method === 'POST' ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(function (resp) {
      if (resp.status === 200) {
        res.send(resp.data)
      } else {
        res.status(resp.status).send(resp.data)
      }
    })
    .catch(function (err) {
      if (err.response) {
        res.status(500).send(err.response.data)
      } else {
        res.status(500).send({
          success: false,
          msg: 'unknown error'
        })
      }
    })
}
