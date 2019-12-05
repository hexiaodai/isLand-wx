// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 期刊标题
    title: {
      type: String,
      value: '秋叶随风'
    },
    // 是否第一期
    first: Boolean,
    // 是否最新一期
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上一期书刊
    onLeft () {
      if(!this.properties.latest) {
        // 向父组件触发 left事件
        this.triggerEvent('left', {})
      }
    },
    // 下一期书刊
    onRight () {
      if(!this.properties.first) {
        this.triggerEvent('right', {})
      }
    }
  }
})
