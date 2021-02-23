const express = require('express')
const router = express.Router()
const path = require('path')

const { blogFile } = require(path.join(__dirname, '..', '..', 'db'))
const { SuccessModel, ParameterError, HttpException } = require(path.join(
  __dirname,
  '..',
  '..',
  'module',
  'messageModel'
))

// 查询全部
router.post('/query', (req, res) => {
  //request response
  blogFile.find({}, (err, data) => {
    res.send({ data, count: data.length })
  })
})

// 查询单个
router.get('/:id/query', (req, res) => {
  //request response
  const _id = req.params.id
  blogFile.findOne({ _id }, (err, data) => {
    if (data === null) {
      res.send(new ParameterError())
      return
    }
    if (!err) {
      res.send(new SuccessModel(data, '成功获取'))
    }
  })
})

// 分页
// 每页分多少条数据 pagingCount每页个数 pageNumber 页码
router.post('/queryPage', (req, res) => {
  const { pagingCount = 4, pageNumber = 1 } = req.body
  const skipNumber = (pageNumber - 1) * pagingCount
  blogFile
    .find()
    .sort({ _id: 1 })
    .skip(skipNumber)
    .limit(pagingCount)
    .exec((err, data) => {
      try {
        if (data === null) {
          res.send(new ParameterError())
          return
        }
        if (!err) {
          res.send(data)
        }
      } catch (error) {
        res.send(new HttpException())
      }
    })
})

module.exports = router
