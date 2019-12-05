import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager() // 音频管理对象

Component({
  // 继承导入的 behaviors
  behaviors: [classicBeh],
  
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false // 音乐播放状态
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 触发播放按钮
    onPlay() {
      mMgr.title = 'music'
      if(!this.data.playing) {
        // 开始播放音乐
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src // 播放音乐
      } else {
        // 停止播放音乐
        this.setData({
          playing: false
        })
        mMgr.pause() // 暂停音乐
      }
    }
  }
})
