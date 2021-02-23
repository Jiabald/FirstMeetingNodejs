const link_mongodb = require('./linkDB')
const userFile = require('./login')
const blogFile = require('./blog')

link_mongodb('test')

module.exports = {
  userFile,
  blogFile,
}
