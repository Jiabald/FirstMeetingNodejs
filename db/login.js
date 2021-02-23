const mongoose = require('mongoose')
const userSchame = {
  _id: String,
  username: {
    type: String,
    trim: true,
    required: true,
  },
  pwd: {
    type: String,
    trim: true,
    required: true,
  },
}

const userModule = new mongoose.Schema(userSchame)

const userFile = mongoose.model('testuser', userModule, 'testuser')

module.exports = userFile
