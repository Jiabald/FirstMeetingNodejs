const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { HttpException } = require(path.join(
  __dirname,
  'module',
  'messageModel'
))

const {
  increaseRouter,
  delRouter,
  changeRouter,
  login,
  query,
} = require('./api/v1')

// 处理静态资源
app.use(express.static(path.join(__dirname, 'public')))
// 解析req.body 参数
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', increaseRouter, delRouter, changeRouter, login, query)

// 捕获异常
app.use((err, req, res, next) => {
  console.log(err)
  res.send(new HttpException())
})

app.listen(PORT)
console.log(`http://localhost:${PORT}`)
