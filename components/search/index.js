import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  // 使用behaviors
  behaviors: [paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    // 检测父组件是否触发 onReachBottom()
    more: {
      type: Boolean,
      observer: 'loadMore' // 加载更多
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [], // 历史搜索关键字
    hotWords: [], // 热门搜索关键字
    searching: false, // 是否处于搜索状态
    q: null, // input搜索框内容
    loading: false, // 锁 - 是否正在发送api请求
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 搜索关键字写入缓存 - Storage; 搜索书籍
    onConfirm(event) {
      this._showResult() // 触发搜索
      this.initialize() // 初始化书籍数据
      const q = event.detail.value || event.detail.text
      if(!q) return
      this.setData({
        q
      })
      this._showLoadingCenter()
      // 搜索书籍
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.bookList.books) // 添加新书籍
          this.setTotal(res.bookList.total) // 设置总记录数
          this._hideLoadingCenter()
          keywordModel.addToHistory(q) // 搜索关键字写入缓存 - Storage
        }, err => {
          console.log(err)
        })
    },

    // 更新historyWords 数据
    updataHistoryWords() {
      // 获取 历史搜索关键字
      const historyWords = keywordModel.getHistory()
      this.setData({
        historyWords
      })
    },

    // 更新 hotWords 数据
    updataHotWords() {
      keywordModel.getHot()
        .then(res => {
          console.log(res)
          const list = res.hot
          this.setData({
            hotWords: list
          })
        })
    },

    // 清空搜search索框
    onDelete(event) {
      this._closeResult() // 清空input value
      this.initialize() // 清空上一次搜索结果
      this._hideLoadingCenter() // 隐藏loading图标
    },

    // 隐藏 search搜索框
    onCancel() {
      this.triggerEvent('cancel') // 向父组件传递 cancel事件
    },

    // 加载更多
    loadMore() {
      if(!this.data.q || this.isLocked()) return
      if(this.hasMore()) { // 判断服务器是否还有数据
        this.locked() // 开始请求服务器api - 加锁 (若不不更新.wxml绑定的数据，可以不用setData())
        bookModel.search(this.getCurrentStart(), this.data.q)
        .then(res => {
          this.setMoreData(res.bookList.books) // 合并搜索书籍书籍
          this.unLocked() // 完成服务器api请求 - 解锁
        }, err => {
          this.unLocked()
          console.log(err)
        })
      }
    },

    // 改变搜索状态 - 搜索中
    _showResult() {
      this.setData({
        searching: true
      })
    },

    // 清空搜索框 - 返回搜索界面
    _closeResult() {
      this.setData({
        searching: false,
        q: null
      })
    },

    // 显示loadingCenter图标
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    // 隐藏loadingCenter图标
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  },

  // 组件初始化，调用attached()
  attached() {
    this.updataHistoryWords() // 初始化 历史搜索关键字
    this.updataHotWords() // 初始化 热门搜索关键字
  }
})
