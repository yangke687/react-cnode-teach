const express = require('express')
const ReactDOMServer = require('react-dom/server')
const serverEntry = require('../dist/server-entry').default
/** read template html */
const path = require('path')
const fs = require('fs')
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = express()

app.get('/', function(req, res) {
  const appStr = ReactDOMServer.renderToString(serverEntry)
  const templateStr = template.replace('<app></app>', appStr)
  res.send(templateStr);
})

app.listen(3333, function(){
  console.log('server is listening on 3333 port')
})