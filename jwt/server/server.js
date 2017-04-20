var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var jwt = require('jsonwebtoken');


app.use(cors())
app.use(bodyParser.json())

app.use('*', (req, res, next) => {
  const username = req.body.username
  console.log('username', username)
  next()
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/login', (req, res) => {
  // Actually check credentials
  const user = {
    username: req.body.username
  }
  var token = jwt.sign(user, 'secret');

  res.setHeader('cookie', JSON.stringify(token))
  res.json(token)
})

app.listen(8888)
