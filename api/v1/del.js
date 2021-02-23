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

router.get('/:id/del', (req, res) => {
  if (!token_verify(req, res)) {
    res.send(new ParameterError('token失效'))
    return
  }
  const _id = req.params.id
  blogFile.deleteOne({ _id }, (err, data) => {
    if (data.deletedCount === 0) {
      res.send(new ParameterError())
    } else {
      if (!err) {
        // console.log(data)
        res.send(new SuccessModel('删除成功'))
      }
    }
  })
})

module.exports = router
