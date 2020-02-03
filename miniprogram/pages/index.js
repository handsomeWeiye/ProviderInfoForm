// miniprogram/pages/index.js
var Bmob = require('../utils/Bmob-2.2.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    userInfo: [],
    hasUserInfo: false,
    companyName: '',
    name: '',
    phone: '',
    address: '',
    productNam: '',
    price: '',
    isDateShow: false,
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    month: '请选择水果上市时间',
    message: '',
    categories: ['生产厂家', '代销商家'],
    category: '',
    isCategoryShow: false,
    priceFocus: false,
    firstSubmit: true,
  },

  getUserInfo: function() {
    var that = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(res) {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      },
      fail: function(res) {
        console.log('获取用户信息失败，可能是用户不同意共享信息，或者是网络出了问题')
      },
      complete: function(res) {},
    })
  },
  inputCompanyName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      companyName: event.detail
    })
  },
  inputName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      name: event.detail
    })
  },
  inputPhone(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      phone: event.detail
    })
  },
  inputAddress(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      address: event.detail
    })
  },
  inputProductName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      productNam: event.detail
    })
  },
  inputPrice(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      price: event.detail
    })
  },
  inputMessage(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      message: event.detail
    })
  },

  categoryConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    wx.showToast({
      title: `${value}`,
    });
    this.setData({
        category: value,
      }),
      this.categoryClose()
  },

  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    wx.showToast({
      title: `当前选择：${value}`,
    });
    this.setData({
        month: value,
      }),
      this.onClose()
  },

  onCancel() {
    wx.showToast({
      title: '取消',
    });
    this.onClose()
  },

  showPopup() {
    this.setData({
      isDateShow: true
    });
  },

  onClose() {
    this.setData({
      isDateShow: false
    });
  },

  categoryShowPopup() {
    this.setData({
      isCategoryShow: true
    });
  },

  categoryClose() {
    this.setData({
      isCategoryShow: false
    });
  },


  checkPhoneNum: function(phoneNumber) {

    let str = /^1\d{10}$/

    if (str.test(phoneNumber)) {

      return true

    } else {

      wx.showToast({

        title: '手机号不正确',

        image: '../images/fail.png'

      })

      return false

    }
  },

  checkPriceNum: function(priceNum) {

    let str = /^[0-9]*$/

    if (str.test(priceNum)) {

      return true

    } else {

      wx.showToast({

        title: '价格是数字哟',

        image: '../images/fail.png'

      })

      return false

    }
  },

  reminder() {
    var that = this;
    if (!this.data.priceFocus) {
      wx.showModal({

        title: '重要提示',

        content: '价格将会是衡量您竞争力的主要因素，请您务必谨慎填写。我们一旦采购，将会是大批量的。',

        success: function(res) {
          that.setData({
            priceFocus: true
          })

          if (res.confirm) {

            console.log('用户点击确定')

          }

        }

      })
    } else {

    }
  },
  // onChange(event) {
  //   this.setData({
  //     radio: event.detail
  //   });
  // },

  // onClick(event) {
  //   const { name } = event.currentTarget.dataset;
  //   this.setData({
  //     radio: name
  //   });
  // },

  onSend() {

    if (this.data.firstSubmit) {
      if (this.data.companyName == "" || this.data.name == "" || this.data.phone == "" || this.data.address == "" || this.data.productNam == "" || this.data.price == "" || this.data.month == "" || this.data.category == "") {

        wx.showModal({

          title: '提示',

          content: '请输入完整信息！',

          success: function(res) {

            if (res.confirm) {

              console.log('用户点击确定')

            }

          }

        })

      } else {
        var phone = this.data.phone;
        var price = this.data.price;
        if (this.checkPhoneNum(phone) && this.checkPriceNum(price)) {
          var providerInfo = Bmob.Query('providerInfo');
          providerInfo.set('companyName', this.data.companyName);
          providerInfo.set('category', this.data.category);
          providerInfo.set('name', this.data.name);
          providerInfo.set('phone', this.data.phone);
          providerInfo.set('address', this.data.address);
          providerInfo.set('productNam', this.data.productNam);
          providerInfo.set('price', this.data.price);
          providerInfo.set('month', this.data.month);
          providerInfo.set('message', this.data.message);
          providerInfo.set('nickName', this.data.userInfo.nickName);
          providerInfo.set('gender', this.data.userInfo.gender);
          providerInfo.set('province', this.data.userInfo.province);
          providerInfo.set('city', this.data.userInfo.city);
          providerInfo.set('openId', this.data.openId);
          providerInfo.set('avatarUrl', this.data.userInfo.avatarUrl);
          providerInfo.save().then(res => {
            console.log(res)
            this.setData({
              firstSubmit: false
            })
            wx.showToast({
              title: '您已成功填写',
            })
          }).catch(err => {
            console.log(err);
            wx.showToast({
              title: '可能是网络原因，填写失败',
              image: '../images/fail.png',
            })
          })
        }

      } 
    } else {
      wx.showModal({
        title: '提示',
        content: '请不要重复提交',
      })
    }





  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    wx.login({
      success:res=>{
        console.log(res.code)
        wx.cloud.callFunction({
          name:'getUserId',
          data:{
            code:res.code
          }
        }).then(
          res=>{
            console.info(res);
            var openId = res.result['event']['userInfo']['openId'];
            console.info(openId)
            this.setData({
              openId: openId
            })
          }
        )
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})