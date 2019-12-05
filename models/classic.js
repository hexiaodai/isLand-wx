import { HTTP } from '../util/http-p.js' // HTTP对象
import { LikeModel } from './like.js';

// 继承 HTTP
class ClassicModel extends HTTP {
  // 加载最新期刊
  getLatest() {
    const latest = this.request({
      url: 'classic/latest'
    })
    latest.then(res => {
      const data = res.art
      this._setLatestIndex(data.index)
      const key = this._getKey(data.index)
      wx.setStorageSync(key, data)
    })
    return latest
  }

  // 加载期刊
  /**
   * @description: 
   * @param: index 当前期刊编号
   * @param: nextOrPrevious next:下一期期刊; Previous 上一期期刊
   */
  getClassic(index, nextOrPrevious) {
    // 1. 缓存中寻找期刊 or 调用API,并写入缓存
    // 2. key 确定期刊 key
    const key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key) // 查找缓存中的 期刊数据
    if(!classic) {
      // 向服务器请求期刊
      classic = this.request({
        url: `classic/${index}/${nextOrPrevious}`
      })
      classic.then(res => {
        // 写入 Storage
        wx.setStorageSync(this._getKey(res.index), res)
      })
    }
    return Promise.resolve(classic)
  }

  getMyFavor(success) {
    return this.request({
      url: 'classic/favor'
    })
  }

  getById(cid, type, success) {
    return this.request({
      url: `classic/${type}/${cid}`
    })
  }

  // 判断当前期刊是否第一期
  isFirst(index) { // index: 期刊号
    return index === 1 ? true : false
  }

  // 判断当前期刊是否最新一期
  isLatest(index) {
    const latestIndex = this._getLatestIndex()
    return index === latestIndex ? true : false
  }

  // 储存最新一期书刊号 - Storage
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  // 读取最新一期书刊号 - Storage
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

  // 设置期刊 key
  _getKey(index) { // index 期刊号
    return 'classic-' + index
  }
}

export { ClassicModel }