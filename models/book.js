import { HTTP } from '../util/http-p.js' // HTTP对象

class BookModel extends HTTP {
  // 获取热门书籍数据
  getHotList() {
    return this.request({
      url: 'book/hotList'
    })
  }

  // 获取我喜欢的书籍数量
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  // 获取书籍详细信息
  getDetail(bid) { // bid: 书籍 id
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  // 获取书籍点赞状态
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  // 获取书籍短评信息
  getComments(bid) {
    return this.request({
      url: `book/${bid}/shortComment`
    })
  }

  // 发送短评
  postComment(bid, comment) { // bid: 短评id, comment: 短评内容
    return this.request({
      url: 'book/add/shortComment',
      method: 'POST',
      data: {
        bookId: bid,
        myContent: comment
      }
    })    
  }

  // 搜索书籍
  search(start, q) { // start: 开始记录数; q: 搜索内容
    return this.request({
      url: 'book/search?summary=1',
      data: {
        start,
        q
      }
    })
  }
}

export { BookModel }
