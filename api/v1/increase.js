const express = require('express')
const router = express.Router()
const path = require('path')
const { blogFile } = require(path.join(__dirname, '..', '..', 'db'))
const { SuccessModel, ParameterError } = require(path.join(
  __dirname,
  '..',
  '..',
  'module',
  'messageModel'
))
const token_verify = require('../../util/token_verify')

router.post('/increase', (req, res) => {
  if (!token_verify(req, res)) {
    res.send(new ParameterError('token失效'))
    return
  }
  const dateId = new Date()
  const _id = dateId.getTime()

  const { title, content } = req.body
  if (title === undefined || content === undefined) {
    res.send(new ParameterError('title和content不能为空'))
  } else {
    blogFile.create({ _id, title, content }, (err, data) => {
      if (!err) {
        res.send(new SuccessModel({ data }, '成功创建'))
      }
    })
  }
})

module.exports = router
