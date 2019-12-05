import {
  Token
} from '/models/token.js'

App({
  // 申请令牌
  onLaunch: function() {
    const token = new Token()
    token.verify()
  }
})