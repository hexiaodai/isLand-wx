import { ClassicModel } from '../../models/classic.js' // ClassicModel对象
import { LikeModel } from '../../models/like.js'

const classicModel = new ClassicModel() // 实例化 ClassicModel对象
const likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null, // 最新书刊数据
    first: false, // 是否第一期书刊
    latest: true, // 是否最新一期书刊
    likeCount: 0, // 点赞数量
    likeStatus: false // 点赞状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载最新期刊
    classicModel.getLatest().then(res => {
      console.log(res)
      const data = res.art
      this.setData({ // setData() 数据更新  
        classic: data,
        likeCount: data.favNums,
        likeStatus: data.likeStatus
      })
    })
  },

  // 点赞 - 取消点赞
  onLike(event) {
    const behavior = event.detail.behavior
    const classic = this.data.classic
    likeModel.like(behavior, classic.id, classic.type)
  },

  // 下一期书刊
  onNext() {
    this._updataClassic('next')
  },
  // 上一期书刊
  onPrevious() {
    this._updataClassic('previous')
  },

  /**
   * @description: 更新期刊
   * @param {String} nextOrPrevious next:下一期期刊; Previous 上一期期刊 
   */
  _updataClassic(nextOrPrevious) {
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious).then(res => {
      // 加载点赞信息
      this._getLikeStatus(res.id, res.type)
      // console.log(res)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  // 获取期刊点赞状态；artID:期刊编号，category:期刊类型
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category).then(res => {
      // 更新期刊点赞状态
      this.setData({
        likeCount: res.favNums,
        likeStatus: res.likeStatus
      })
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