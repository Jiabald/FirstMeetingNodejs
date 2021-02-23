const success = 10000
const err = 10001
const fail = 10005

class SuccessModel {
  constructor(data, messsage) {
    this.status = success
    if (typeof data === 'string') {
      this.messsage = data
      data = null
      messsage = null
    }
    if (data) {
      this.data = data
    }
    if (messsage) {
      this.messsage = messsage
    }
  }
}

class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = err, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class LoginFail {
  constructor(msg = '登录失败', errorCode = fail) {
    this.errorCode = errorCode
    this.meg = msg
  }
}

class ParameterError {
  constructor(msg = '参数错误', errorCode = fail) {
    this.errorCode = errorCode
    this.msg = msg
  }
}

module.exports = {
  SuccessModel,
  HttpException,
  LoginFail,
  ParameterError,
}
