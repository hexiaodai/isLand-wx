// like/index.js

Component({
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
    count: null,
    like: null
  },
  methods: {
    onLike() {
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count - 1 : count + 1;
      // setData(): 更新数据绑定
      this.setData({
        count,
        like: !like
      })
      // 点赞信息
      const behavior = this.properties.like ? 'like' : 'cancel'
      // 自定义事件 - 点击点赞时，向外派发一个like事件
      this.triggerEvent('like', {
        behavior // 传递参数
      })
    }
  },
  // 组件的属性列表
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    }
  },
  // 生命周期回调—监听页面加载
  onLoad () {
    
  }
})