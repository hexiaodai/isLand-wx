// components/tag/index.js
Component({
  options: {
    multipleSlots: true // 启用插槽
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String
    }
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
    onTap(event) {
      // 触发自定义事件 tapping
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})
