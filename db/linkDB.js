const link_mongodb = (databaseName) => {
  const mongoose = require('mongoose')

  mongoose
    .connect(`mongodb://127.0.0.1/${databaseName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`连接${databaseName}数据库成功`)
    })
    .catch((err) => {
      console.log('连接失败', err)
    })
}

module.exports = link_mongodb
