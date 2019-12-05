Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击书籍跳转书籍详情页面
    onTap(event) {
      const bid = this.properties.book.id // 书籍id
      // wx.navigateTo() 页面跳转
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  },
})
