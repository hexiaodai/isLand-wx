import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {}, // 书籍信息
    comments: [], // 书籍短评
    likeStatus: false, // 书籍点赞状态
    likeCount: 0, // 书籍点赞次数
    posting: false // 是否 开启短评窗口
  },

  // 点赞/ 取消点赞
  onLike(event) {
    console.log(this.data.book)
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.book.id, 400)
  },

  // 弹出短评框
  onFakePost() {
    this.setData({
      posting: true
    })
  },

  // 隐藏短评框
  onCancel() {
    this.setData({
      posting: false
    })
  },

  // 发送短评
  onPost(event) {
    const comment = event.detail.text || event.detail.value // 短评内容

    if(comment.length > 12 || !comment) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    // 发送短评数据到服务器
    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        // 短评成功，显示提示信息
        wx.showToast({
          title: '+1',
          icon: 'none'
        })
        // 更新 comments[], - 短评内容
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments, // 更新本地短评数据
          posting: false // 关闭评论窗口
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 开启 loading提示
    wx.showLoading({
      title: '偷懒加载中'
    })

    // 通过book id 加载 book-detail页面数据
    const bid = options.bid // 页面之间传递的参数包含在 options内
    // Promise实例
    const detail = bookModel.getDetail(bid) // 书籍信息
    const likeStatus = bookModel.getLikeStatus(bid) // 书籍点赞状态
    const comments = bookModel.getComments(bid) // 书籍短评

    // 合并 Promise实例
    Promise.all([detail, likeStatus, comments])
      .then(res => {
        // detail, likeStatus, comments请求全部完成，触发 resolve()
        // res 返回resolve() 数据
        this.setData({
          book: res[0].detail,
          likeStatus: res[1].likeStatus,
          likeCount: res[1].favNums,
          comments: res[2]
        })
        wx.hideLoading() // 关闭 loading提示
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})