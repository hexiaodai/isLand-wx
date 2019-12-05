import { config } from '../config.js'

const tips = {
  1: '意料之外的错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

class HTTP {
  request (params) {
    if(!params.method){
      params.method = 'GET'
    }
    // request 异步
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        const code = res.statusCode.toString()
        if(code.startsWith('2')){
          // 成功 - 执行回调
          params.success && params.success(res.data)
        }else{
          const error_code = res.data.error_code
          // 抛出错误
          this._show_error(error_code)
        }
      },
      fail: err => {
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if(!error_code) {
      error_code = 1
    }
    // 小程序 - 显示抛出错误
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }