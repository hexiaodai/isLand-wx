// 定义组件行为 - 组件公用数据 (component())
const classicBeh = Behavior({
  /**
   * 组件的属性列表
   */
  properties: {
    image: {
      type: String
    },
    content: {
      type: String,
      value: '「秋叶随风」搭乘404航班去诗和远方了'
    },
    // 显示/隐藏组件
    hidden: {
      type: Boolean,
      value: false
    }
  }
})

export { classicBeh }