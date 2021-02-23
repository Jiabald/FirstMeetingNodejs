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

router.post('/:id/change', (req, res) => {
  if (!token_verify(req, res)) {
    res.send(new ParameterError('token失效'))
    return
  }
  const _id = req.params.id
  const { title, content } = req.body

  if (title === undefined || content === undefined) {
    res.send(new ParameterError('title和content不能为空'))
  } else {
    blogFile.updateMany({ _id }, { $set: { title, content } }, (err, data) => {
      if (data.ok != 1 || data.n != 1) {
        res.send(new ParameterError('修改出错或者参数错误'))
        return
      }
      if (!err) {
        // console.log(data)
        res.send(new SuccessModel('修改成功'))
      }
    })
  }
})

module.exports = router
