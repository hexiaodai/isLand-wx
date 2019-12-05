import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

import {
  promisic
} from '../../util/common.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null, // 用户信息
    bookCount: 0, // 用户喜欢的数据
    classics: null // 用户喜欢的期刊
  },

  onShow(options) {
    this.userAuthorized1()
    this.getMyBookCount()
    this.getMyFavor()
  },

  // 获取用户喜欢的期刊
  getMyFavor() {
    classicModel.getMyFavor().then(res => {
      this.setData({
        classics: res
      })
    })
  },

  // 获取用户喜欢书籍数量
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.bookLikeCount
        })
      })
  },

  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },


  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },



  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  // onJumpToDetail(event) {
  //   const cid = event.detail.cid
  //   const type = event.detail.type
  //   wx.navigateTo({
  //     url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
  //   })
  // }
})
