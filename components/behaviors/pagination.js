const paginationBev = Behavior({
  data: {
    booksData: [], // 搜索书籍数据
    total: null, // 数据总记录数
    noneResult: false, // 是否搜索到书籍 数据
    loading: false // 锁 - 是否正在发送api请求
  },

  methods: {
    // 新添加的书籍数据
    setMoreData(booksData) { // booksData: 已经存在的书籍
      booksData = this.data.booksData.concat(booksData) // 合并搜索书籍书籍
      this.setData({
        booksData
      })
    },

    // 返回书籍起始记录数
    getCurrentStart() {
      return this.data.booksData.length
    },

    // 判断是否还要更多数据需要加载
    hasMore() {
      if(this.data.booksData.length >= this.data.total) { // 服务器无更多数据
        return false
      }
      return true
    },

    // 设置总记录数
    setTotal(total) {
      this.data.total = total // 若不更新.wxml变量，无需使用setData()
      if(total === 0) { // total==0, 未搜索到结果
        this.setData({
          noneResult: true
        })
      }
    },

    // 初始化搜索数据
    initialize() {
      this.setData({
        booksData: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null // 清空总记录数
    },

    // 是否锁住状态
    isLocked() {
      return this.data.loading ? true : false
    },

    // 加锁
    locked() {
      this.setData({
        loading: true
      })
    },

    // 解锁
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})

export { paginationBev }