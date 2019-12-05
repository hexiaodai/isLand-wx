import { BookModel } from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [], // 精选书籍
    searchPanel: false, // search框
    more: false // 是否触发 onReachBottom()
  },

  // 启用 search框
  onActivateSearch() {
    this.setData({
      searchPanel: true
    })
  },

  // 关闭 search框
  onCancel() {
    this.setData({
      searchPanel: false
    })
  },

  // 页面上拉触底事件触发时触发 onReachBottom()
  onReachBottom() {
    this.setData({
      more: !this.data.more
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotList = bookModel.getHotList() // 返回 Promise对象
    hotList.then(res => {
      this.setData({
        books: res.hotBooks
      })
    }, err => {
      console.log(err)
    })
  },
})