const express = require('express')
const path = require('path')
const fs = require('fs')
const devStatic = require('./utils/dev.static')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const serverRender = require('./utils/server-render')

const isDev = process.env.NODE_ENV === 'development'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  maxAge: 10 * 60 * 1000, // 10 minutes
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode teach' // encrypted key
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

/** user login proxy */
app.use('/api/user', require('./utils/handle-login'))
app.use('/api', require('./utils/proxy'))

if (!isDev) {
  const serverEntry = require('../dist/server-entry') // m
  /** read template html */
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.template.ejs'), 'utf8')

  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res, next) {
    serverRender(serverEntry, template, req, res).catch(next)
  })
} else {
  devStatic(app)
}

app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500).send(err)
})

app.listen(3333, function () {
  console.log('server is listening on 3333 port')
})
