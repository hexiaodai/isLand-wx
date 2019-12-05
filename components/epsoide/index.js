// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 期刊号
    index: {
      type: [Number, String],
      // index值被改变，调用 observer()
      observer(newVal, oldVal, changePath) {
        // console.log(newVal, oldVal, changePath)
        const val = newVal < 10 ? ('0' + newVal) : newVal
        console.log(val)
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: null,
    _index: 0,
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  // 在组件实例进入页面节点树时执行
  attached() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    this.setData({
      year,
      month: this.data.months[month]
    })
  }
})
