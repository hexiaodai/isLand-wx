import { HTTP } from '../util/http-p.js'

class LikeModel extends HTTP {
  // 点赞/取消点赞
  // 参数：behavior: cancel取消点赞，like点赞
  // artID: 点赞对象ID
  // category：点赞类型 100 电影 200 音乐 300 句子 400 书籍
  like (behavior, artID, category) {
    const url = behavior === 'like' ? 'like' : 'like/cancel'
    const like = this.request({
      url: url,
      method: 'POST',
      data: {
        artId: artID,
        type: category
      }
    })
    return like
  }

  /**
   * @description: 获取点赞信息
   * @param {int} artID 期刊id 
   * @param {String} category 期刊类型
   * @param {function} 回调
   */
  getClassicLikeStatus(artID, category) {
    return this.request({
      url: `classic/${category}/${artID}/favor`
    })
  }
}

export { LikeModel }