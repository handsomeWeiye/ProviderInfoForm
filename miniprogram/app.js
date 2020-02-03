//app.js
App({
  onLaunch: function () {
    wx.cloud.init()
    var Bmob = require('utils/Bmob-2.2.2.min.js');
    Bmob.initialize('7b9a591c3684f7ac', '410423');
    this.globalData = {}
  }
})
