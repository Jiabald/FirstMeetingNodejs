const jwt = require('jsonwebtoken')
const key = '1010**__uuu'

const token_verify = (req, res) => {
  let flag = null
  jwt.verify(req.cookies.token, key, (err, data) => {
    if (err) {
      flag = false
      return
    }
    flag = true
  })
  return flag
}

module.exports = token_verify
