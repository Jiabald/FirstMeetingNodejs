const mongoose = require('mongoose')
const blogSchame = {
  _id: String,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}

const blogModel = new mongoose.Schema(blogSchame)

const blogFile = mongoose.model('blog', blogModel, 'blog')

module.exports = blogFile
