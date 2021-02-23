const express = require('express')
const router = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken')
const key = '1010**__uuu'

const { userFile } = require(path.join(__dirname, '..', '..', 'db'))
const { SuccessModel, LoginFail } = require(path.join(
  __dirname,
  '..',
  '..',
  'module',
  'messageModel'
))

router.post('/login', (req, res) => {
  const { username, pwd } = req.body
  userFile.find({ username, pwd }, async (err, data) => {
    if (data.length === 0) {
      res.send(new LoginFail())
      return
    }
    if (!err) {
      const token = jwt.sign({ username }, key, { expiresIn: '48h' })
      // 设置只能由服务端给改cookies
      res.cookie('token', token, { httpOnly: true })
      res.send(new SuccessModel({ token }, '登陆成功'))
    }
  })
})

module.exports = router
