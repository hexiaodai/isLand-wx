import { HTTP } from '../util/http-p.js'

class KeywordModel extends HTTP {
  key = 'q' // 搜索关键字 key
  maxLength = 10 // 历史搜索数组长度

  // 获取历史关键字
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if(!words) {
      return []
    }
    return words
  }

  // 获取热门关键字
  getHot() {
    return this.request({
      url: 'book/hotKeyword'
    })
  }

  // 搜索关键字写入缓存 - Storage()
  addToHistory(keyword) {
    let words = this.getHistory() // 获取历史关键字 - Array()
    const has = words.includes(keyword) // includes(): 查看 keyword是否存在 words数组中 （indexOf）
    if(!has) {
      const length = words.length
      if(length >= this.maxLength) {
        // 删除数组末尾元素
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel }