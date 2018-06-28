const express = require('express')
const router = express.Router()
const axios = require('axios')
const baseUrl = require('./baseUrl')

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  })
    .then(function (resp) {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(function (err) {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        next(err) // throw exceptions
      }
    })
})

module.exports = router
