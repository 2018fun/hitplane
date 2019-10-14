/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class E8Platform {


  // name;
  // banner;
  // video;
  // infoButton;
  // infoButtonActive;

  initSDK() {

    if (this.name === "wxgame") {
      this.infoButton;
      this.infoButtonActive = false;
      platform.openDataContext.postMessage({
        command: 'loadRes'
      });

      wx.showShareMenu({
        withShareTicket: true
      })
      // wx.updateShareMenu({
      //   withShareTicket: true
      // })

      //是否带有shareTicket,有的话进入群排行榜界面
      // let LaunchOption = wx.getLaunchOptionsSync();
      // console.log("LaunchOption", LaunchOption);

      wx.onShareAppMessage((res) => {
        if (res.from === 'button') {
          console.log("来自页面内转发按钮");
          console.log(res.target);
        } else {
          console.log("来自右上角转发菜单")
        }
        return {
          title: '一起来探索',
          imageUrl: "https://mmocgame.qpic.cn/wechatgame/3ibN9vA4DXvAP2hN6lb1oibs9uGwMa4icCAiczgvo9f7jS0nHXiciaicMjhibXibibgwBfNhbv/0",
          imageUrlId: "68nWRhRWRYOxKa5e81QPHw",
          // imageUrl: "https://tishoy.github.io/kaihi3_h5/resource/share.jpg",
          // imageUrl: "https://cdn.joypac.cn/kaihi_h5_res/share.jpg",
          success: (res) => {
            console.log("转发成功", res);
            // wx.getShareInfo({
            //   shareTicket: res.shareTickets,
            //   success: function (res) {
            //     console.log("getShareTickets", res);
            //   },
            //   fail: function (res) {
            //     console.log("getShareTickets", res);
            //   }
            // })
          },
          fail: (res) => {
            console.log("转发失败", res);
          }
        }
      });



    } else if (this.name === "qg") {
      qg.initAdService({
        appId: '30001041',
        isDebug: false,
        success: (res) => {
          console.log('succ')
        },
        fail: (res) => {
          console.log('fail:' + res.code + res.msg)
        },
        complete: (res) => {
          console.log('complete:')
        }
      })
      qg.getSystemInfo({
        success: function (res) {
          window.sysInfo = res;
          console.log(res.brand);
          console.log(res.language);
          console.log(res.model);
          console.log(res.platform);
          console.log(res.screenHeight);
          console.log(res.screenWidth);
          // ...
        },
        fail: function (err) { },
        complete: function (res) { }
      })

    } else if (this.name === "tt") {
      tt.showShareMenu({
        withShareTicket: true
      })

      console.log(tt.getSystemInfoSync());
      // wx.updateShareMenu({
      //   withShareTicket: true
      // })
      //是否带有shareTicket,有的话进入群排行榜界面
    } else if (this.name === "baidu") {
      swan.showShareMenu();
      swan.setEnableDebug({
        enableDebug: true
      })
      this.createRecommendation();
      var phone = swan.getSystemInfoSync();

    }

  }

  onShow(func) {
    if (platform.name === "wxgame") {
      wx.onShow(func);
    }
  }

  getLaunchOption() {
    let result = {}
    if (platform.name === "wxgame") {
      result = wx.getLaunchOptionsSync();
    } else if (platform.name === "tt") {
      result = tt.getLaunchOption();
    }

    return result;
  }

  initAnalytics() {
    if (this.name === "qqplay") {
      let config = {
        gameKey: "02a2d376f1268780cdeb969e3385bae2",
        secretKey: "9b426779362d3259747c55f90ce0a40500524bcb"
      }
      return config;

      // window.GameAnalytics = window.GameAnalytics || function () { (GameAnalytics.q = GameAnalytics.q || []).push(arguments) };
      // GameAnalytics("setEnabledInfoLog", true);
      // GameAnalytics("initialize", "02a2d376f1268780cdeb969e3385bae2", "9b426779362d3259747c55f90ce0a40500524bcb");
    } else if (this.name === "wxgame") {

    } else if (this.name === "tt") {

    }
  }

  analytics(key, value) {
    if (this.name === "wxgame") {
      wx.aldSendEvent(key, value)
    } else if (this.name === "tt") {

    }
  }

  callFunction(func, data, callback) {
    if (platform.name === "wxgame") {
      wx.cloud.callFunction({
        // 云函数名称
        name: func,
        // 传给云函数的参数
        data: data,
        success: function (res) {
          console.log(res) // 3
          callback(res);
        },
        fail: console.error
      })
    }

  }

  //cloud://hitplan-900934.6869-hitplan-900934/background.m4a
  downloadFile(fileId, callback) {
    if (platform.name === "wxgame") {
      wx.cloud.downloadFile({
        fileID: fileId,
        success: res => {
          callback(res.tempFilePath);
          // get temp file path
          console.log(res.tempFilePath)
        },
        fail: err => {
          // handle error
        }
      })
    }

  }

  setLifeCycleCallBack(onPause, onResume) {
    if (this.name === "qqplay") {
      BK.QQ.listenGameEventEnterBackground({}, function () {
        if (onPause) {
          onPause();
        }
      });
      BK.QQ.listenGameEventEnterForeground({}, function () {
        if (onResume) {
          onResume();
        }
      });
    } else {
      egret.lifecycle.onPause = () => {
        onPause();
      }

      egret.lifecycle.onResume = () => {
        onResume();
      }
    }
  }

  offsetHead() {
    if (this.name === "wxgame" || this.name === "qqplay" || this.name === "tt" || this.name === "qg") {
      console.log("offsetHead");
      return Util.curWidth() / window.sysInfo.screenWidth * 350;;
    } else if (this.name == "baidu") {
      return 150;
    }
  }

  setLoadingProgress(percent) {
    if (this.name === "oppo") {
      OPPO.setLoadingProgress(percent);
    }
  }

  loadingComplete() {
    if (this.name === "oppo") {
      OPPO.loadingComplete()
    } else if (this.name === "mi") {
      // 游戏开始
      XMGame.game_start(foo) // 游戏loading蒙层会取消

      function foo(result) {
        if (result.code === "3") {
          // 需要调用提前游戏结束的逻辑，这是例子
          XMGame.game_over({
            cost_time: 10000,
            score: 0
          })
        }
      }

    }
  }

  print(msg) {
    if (this.name === "qqplay") {
      BK.Script.log(1, 1, "joypac " + msg);
    } else {
      console.log("joypac " + msg);
    }
  }

  share(title, url, iconurl = "", cb = null, extendInfo = {}, savedPath = "") {
    if (this.name === "wxgame") {
      // if (url.indexOf("http") === -1) {
      wx.shareAppMessage({
        title: title,
        imageUrl: "https://mmocgame.qpic.cn/wechatgame/3ibN9vA4DXvAP2hN6lb1oibs9uGwMa4icCAiczgvo9f7jS0nHXiciaicMjhibXibibgwBfNhbv/0",
        query: extendInfo,
        imageUrlId: "68nWRhRWRYOxKa5e81QPHw"
      })
      // } else {
      //     wx.shareAppMessage({
      //         title: title,
      //     })
      // }
    } else if (this.name == "baidu") {
      swan.shareAppMessage({
        title: title,
        imageUrl: url
      })

    } else if (this.name === "qqplay") {
      // if (url.indexOf("http") === -1) {
      //     url = "GameRes://" + url
      // }
      var shareInfo = {
        summary: title, //QQ聊天消息标题
        picUrl: "", //QQ聊天消息图片
        extendInfo: extendInfo, //QQ聊天消息扩展字段
        localPicPath: "", //分享至空间、微信、朋友圈时需要的图。（选填，若无该字段，系统使用游戏对应的二维码）
        gameName: "神回避" //游戏名，暂用与生成二维码
      };

      BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
        BK.Script.log(1, 1, "joypac retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
        if (retCode == 0) {
          if (shareDest == 0 /* QQ */) {
            //聊天窗
            BK.Script.log(1, 1, "joypac 成功分享至QQ");
          } else if (shareDest == 1 /* QZone */) {
            //空间
            BK.Script.log(1, 1, "joypac 成功分享至空间");
          } else if (shareDest == 2 /* WX */) {
            //微信
            BK.Script.log(1, 1, "joypac 成功分享至微信");
          } else if (shareDest == 3 /* WXCircle */) {
            // 朋友圈
            BK.Script.log(1, 1, "joypac 成功分享至朋友圈");
          }
        } else if (retCode == 1) {
          BK.Script.log(1, 1, "joypac 分享失败" + retCode);
        } else if (retCode == 2) {
          BK.Script.log(1, 1, "joypac 分享失败，用户取消分享：" + retCode);
        }
      });
    } else if (this.name === "tt") {
      tt.shareAppMessage({
        title: title,
        imageUrl: url,
        withShareTicket: true
      })
    } else {

    }
  }

  existRank() {
    if (this.name === "qqplay") {
      return true;
    }
    if (this.name === "oppo") {
      return true;
    }
    if (this.name === "wxgame") {
      return true;
    }
    if (this.name === "tt") {

    }
    return false;
  }

  uploadRank(key, value) {
    if (this.name === "wxgame") {
      let valueStr = {
        "wxgame": {
          "card_num": value + '',
          "update_time": ((new Date()).getTime()).toString()
        },
      };
      var kvDataList = [];
      kvDataList.push({
        key: 'card_num',
        value: JSON.stringify(valueStr)
      });
      wx.getStorageInfo({
        success: (keys, currentSize, limitSize) => {
          let hasKey = false;

          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
              console.log("存在本地存储");
              wx.getStorage({
                "key": key, //根据上传托管定义的key值进行获取 获取存储的记录
                success: res => {
                  //后面加上 ?aaa=aa.jpg 这几个字符，就能够访问到用户头像图片
                  //拿到数居 进行排序
                  // this.parseCloudRecord(data);
                  // this.recordData = res.data;
                  // this.parseCloudRecord(res.data);
                  // 对比上次成绩 再次上传



                  wx.setUserCloudStorage({
                    KVDataList: kvDataList,
                    success: function (res) {
                      console.log("上传数据成功");
                      console.log(kvDataList);

                      wx.setStorage({
                        key: key,
                        data: valueStr,
                        success: function (res) {
                          console.log("本地存储更新成功");
                        },
                        fail: function (res) {
                          console.log("本地存储更新失败");
                        },
                        complete: function (res) { }
                      });
                    },
                    fail: function (res) {

                    },
                    complete: function (res) { }
                  });

                },
                fail: function (res) { },
                complete: function () { }
              })
              hasKey = true;
              break;
            }

          }
          if (hasKey === false) {
            wx.setUserCloudStorage({
              KVDataList: kvDataList,
              success: function (res) {
                console.log(kvDataList);

                wx.setStorage({
                  key: key,
                  data: valueStr,
                  success: function (res) {
                    console.log("本地存储更新成功");
                  },
                  fail: function (res) {
                    console.log("本地存储更新失败");
                  },
                  complete: function (res) { }
                });
              },
              fail: function (res) {

              },
              complete: function (res) { }
            });
          }
        },
        fail: () => {

        },
        complete: () => {

        }

      });
    } else if (this.name === "qqplay") {
      BK.Script.log(1, 1, value);
      var time = ((new Date()).getTime()).toString();
      var data = {
        userData: [{
          openId: GameStatusInfo.openId,
          startMs: time, //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
          endMs: ((new Date()).getTime()).toString(), //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
          scoreInfo: {
            score: value, //分数，类型必须是整型数
          },
        },],
        attr: {
          score: {
            type: 'rank',
            order: 1,
          },
        },
      };
      // gameMode: 游戏模式，如果没有模式区分，直接填 1
      // 必须配置好周期规则后，才能使用数据上报和排行榜功能
      BK.Script.log(1, 1, '上传分数');
      BK.QQ.uploadScoreWithoutRoom(1, data, function (errCode, cmd, data) {
        // 返回错误码信息
        if (errCode !== 0) {
          BK.Script.log(1, 1, '上传分数失败!错误码：' + errCode);
        }
      });
    } else if (this.name === "oppo") {
      OPPO.updateGameRank({
        score: value // 更新当前账号在排行榜中显示的可比较数值（整数，最大值为2147483647）
      })
    }
  }

  getRank(key) {
    if (this.name === "wxgame") {
      wx.getFriendCloudStorage({
        keyList: [key], //根据上传托管定义的key值进行获取 获取存储的记录
        success: res => {
          //后面加上 ?aaa=aa.jpg 这几个字符，就能够访问到用户头像图片
          console.log("好友数据请求成功", res.data);
          //拿到数居 进行排序
          // this.parseCloudRecord(data);
          // this.recordData = res.data;
          // this.parseCloudRecord(res.data);

        },
        fail: function () {
          console.log("好友数据失败");
        },
        complete: function () {
          console.log("好友数据完成");
        }
      })
    } else if (this.name === "qqplay") {
      BK.Script.log(1, 1, '获取排行榜');
      return new Promise((resolve, reject) => {
        var attr = "score"; //使用哪一种上报数据做排行，可传入score，a1，a2等
        var order = 1; //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
        var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能

        BK.Script.log(1, 1, '获取排行榜数据');
        BK.QQ.getRankListWithoutRoom(attr, order, rankType, function (errCode, cmd, data) {
          // 返回错误码信息
          if (errCode !== 0) {
            resolve([]);
            return;
          }
          // 解析数据
          if (data) {
            BK.Script.log(1, 1, '获取数据' + data.data.ranking_list);
            resolve(data.data.ranking_list);
            /**
             * {"nick":"哈N她!)|A(","score":5,"selfFlag":1,"url":"http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478"}
             */
            // this.parseQQPlayRecord(data.data.ranking_list);
            // console.log(data.data.ranking_list);
          }


        }.bind(this));
      });
    }
  }

  fetchBanner() {
    if (this.name === "qqplay") {
      return new Promise((resolve, reject) => {
        BK.Advertisement.fetchBannerAd(function (retCode, msg, adBannerHandle) {
          if (retCode == 0) {
            adBannerHandle.onClickContent(function () {
              BK.Script.log(1, 1, "joypac 点击了广告 msg:" + msg);
            });
            adBannerHandle.onClickClose(function () {
              BK.Script.log(1, 1, "joypac 关闭了广告 msg:" + msg);
            });
            resolve(adBannerHandle);
          } else {
            resolve(null);
            BK.Script.log(1, 1, "joypac fetchBannerAd failed. retCode:" + retCode);
          }
        }.bind(this));
      })
    } else if (this.name === "oppo") {
      return new Promise((resolve, reject) => {
        var bannerAd = opUnion.createBannerAd({
          containerId: 'banner',
          posId: '33043',
          mediaId: '101000219',
        });
        bannerAd.onLoad(function (err) {
          let ad_node = document.getElementById("ad");
          ad_node.style.display = "none"; //block
          resolve(bannerAd);
        })
        bannerAd.onError(function (err) {
          let ad_node = document.getElementById("ad");
          ad_node.style.display = "none"; //block
          resolve(null);
        })
        bannerAd.addEventListener("onclick", () => {

        })
      })
    } else if (this.name === "baidu") {
      console.log("baidu banner");
      return new Promise((resolve, reject) => {
        //   // 百度的广告id
        //   let example = {
        //     adUnitId: '6203020',
        //     appSid: 'c51be905',
        //     style: {
        //         top: 20,
        //         left: 100,
        //         width: 300
        //     }
        // }
        // const bannerAd = swan.createBannerAd(example);
        var phone = swan.getSystemInfoSync();
        var w = phone.screenWidth * 2 / 3;
        var bannerAd = swan.createBannerAd({
          adUnitId: '6210436',
          appSid: 'ce77efb5',
          style: {
            top: 0,
            left: 0,
            width: 320
          }
        });

        bannerAd.onError(function (err) {
          console.log(err)
        });

        bannerAd.onLoad(function () {
          console.log("bannerloaded baidu");
          resolve(bannerAd);
        }.bind(this))
      });
    } else if (this.name === "wxgame") {
      return new Promise((resolve, reject) => {
        // 微信的广告id
        var phone = wx.getSystemInfoSync();
        console.log(phone);
        var w = phone.screenWidth * 2 / 3;
        var bannerAd = wx.createBannerAd({
          adUnitId: 'adunit-78b316742ccc415e',
          style: {
            left: 0,
            top: 0,
            width: w,
            height: 80
          }
        });

        bannerAd.onError(function (err) {
          console.log(err)
        });

        bannerAd.onLoad(function () {
          console.log("bannerloaded");
        }.bind(this))
        resolve(bannerAd);
      });
    } else if (this.name === "qg") {
      return new Promise((resolve, reject) => {
        let bannerAd = qg.createBannerAd({
          posId: '40689'
        })
        bannerAd.onShow(() => {
          console.log('banner 广告显示')
        })
        bannerAd.onHide(() => {
          console.log('banner 广告隐藏')
        })
        bannerAd.onError((err) => {
          console.log(JSON.stringify(err));
        })
        resolve(bannerAd);
      });
    } else if (this.name === "tt") {
      return new Promise((resolve, reject) => {
        var phone = tt.getSystemInfoSync();
        console.log(phone);
        var w = phone.windowWidth;
        var bannerAd = tt.createBannerAd({
          adUnitId: '13h3c2afi3a31e2ii1',
          style: {
            left: 0,
            top: 0,
            width: w,
          }
        });
        bannerAd.onError(function (err) {
          console.log(err)
          reject(bannerAd)
        });
        bannerAd.onLoad(function () {
          console.log("bannerloaded");

        }.bind(this))
        resolve(bannerAd);
      });
    }
  }

  showBanner(banner) {
    if (this.name === "qqplay") {
      if (banner === null) {
        return;
      }
      banner.show(function (succCode, msg, handle) {
        if (succCode == 0) {
          //
        } else {
          BK.Script.log(1, 1, "展示失败 msg:" + msg);
        }
      }.bind(this));
    } else if (this.name === "oppo") {
      let ad_node = document.getElementById("ad");
      ad_node.style.display = "block"; //block
    } else if (this.name === "qg") {
      banner.show()
    } else if (this.name === "wxgame") {
      var phone = wx.getSystemInfoSync();
      console.log(phone);
      var w = phone.screenWidth / 2;
      var h = phone.screenHeight;
      banner.style.left = w - banner.style.realWidth / 2;
      banner.style.top = h - banner.style.realHeight;

      banner.show();
    } else if (this.name === "baidu") {
      console.log("show banner");
      var phone = swan.getSystemInfoSync();
      console.log(phone);
      var w = phone.screenWidth;
      var h = phone.screenHeight;
      //console.log(banner.style.realWidth);
      banner.style.left = 0; //(phone.screenWidth - banner.style.width) / 2;
      // banner.style.width = 320;
      banner.style.left = (phone.screenWidth - banner.style.width) / 2;
      banner.style.top = h - banner.style.height;

      console.log(banner.style.width);
      console.log(banner.style.height);
      banner.show();
    } else if (this.name === "tt") {
      var phone = tt.getSystemInfoSync();
      var w = phone.screenWidth;
      var h = phone.screenHeight;
      banner.style.left = (phone.screenWidth - banner.style.width) / 2;
      banner.style.top = h - banner.style.width * 9 / 16;
      banner.show();
    }
  }
  hideBanner(banner) {
    if (this.name === "qqplay") {
      banner.close();
    } else if (this.name === "oppo") {
      let ad_node = document.getElementById("ad");
      ad_node.style.display = "none"; //block
    } else if (this.name === "qg") {
      banner.hide();
    } else if (this.name === "wxgame") {
      banner.hide();

    }
    else if (this.name === "baidu") {
      banner.hide();
    }
    else if (this.name === "tt") {
      banner.hide();
    }
  }

  fetchVedio() {
    if (this.name === "wxgame") {
      return new Promise((resolve, reject) => {
        // 填入微信
        var rewardedVideoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-f9279a1489084761'
        });
        rewardedVideoAd.onError(function (err) {
          console.log(err);
          resolve(rewardedVideoAd);
        }.bind(this))
        rewardedVideoAd.onClose(function (res) {
          var result = {
            start: false,
            finish: false
          };
          // 用户点击了【关闭广告】按钮
          // 小于 2.1.0 的基础库版本，res 是一个 undefined
          console.log(res)
          if (res && res.isEnded || res === undefined) {
            // 正常播放结束，可以下发游戏奖励
            this.onEnd({
              start: false,
              finish: true
            });
          } else {
            this.onEnd({
              start: false,
              finish: false
            });
            // 播放中途退出，不下发游戏奖励
          }
        }.bind(this))

        rewardedVideoAd.load()
          .then(() => resolve(rewardedVideoAd))
          .catch(err => {
            console.log(err.errMsg)
            resolve(rewardedVideoAd);
          })



      })
    } else if (this.name === "baidu") {
      return new Promise((resolve, reject) => {
        // 填入baidu
        var rewardedVideoAd = swan.createRewardedVideoAd({
          adUnitId: '6210439',
          appSid: 'ce77efb5',
        });
        rewardedVideoAd.onError(function (err) {
          console.log(err);
          resolve(rewardedVideoAd);
        }.bind(this))

        rewardedVideoAd.onClose(function (res) {
          var result = {
            start: false,
            finish: false
          };
          // 用户点击了【关闭广告】按钮
          // 小于 2.1.0 的基础库版本，res 是一个 undefined
          console.log(res)
          if (res && res.isEnded || res === undefined) {
            // 正常播放结束，可以下发游戏奖励
            this.onEnd({
              start: false,
              finish: true
            });
          } else {
            this.onEnd({
              start: false,
              finish: false
            });
            // 播放中途退出，不下发游戏奖励
          }
        }.bind(this))

        rewardedVideoAd.load()
          .then(() => resolve(rewardedVideoAd))
          .catch(err => {
            console.log(err.errMsg)
            resolve(rewardedVideoAd);
          })



      })
    } else if (this.name === "qqplay") {
      return new Promise((resolve, reject) => {
        var videoType = 0; //激励视频广告场景 0.游戏页面挂件广告 1.游戏结算页广告 2.游戏任务广告  3.游戏复活广告 
        BK.Advertisement.fetchVideoAd(videoType, function (retCode, msg, handle) {
          if (retCode == 0) {
            AdManager.getInstance().vedioLoaded = true;
            resolve(handle);
          } else {
            AdManager.getInstance().vedioLoaded = false;
            resolve(null)
          }
        }.bind(this));
      });
    } else if (this.name === "oppo") {
      return new Promise((resolve, reject) => {
        var rewardedVideoAd = opUnion.createVideoAd({
          posId: '32998',
          mediaId: '101000219'
        })
        console.log('开始视频广告加载');

        rewardedVideoAd.onLoad(function () {
          AdManager.getInstance().vedioLoaded = true;
        })

        rewardedVideoAd.onError(function (err) {
          resolve(rewardedVideoAd);
          AdManager.getInstance().vedioLoaded = false;
        })

        rewardedVideoAd.load();
        resolve(rewardedVideoAd);

      })
    } else if (this.name === "mi") {
      AdManager.getInstance().vedioLoaded = true;
    } else if (this.name === "qg") {
      return new Promise((resolve, reject) => {
        let rewardedVideoAd = qg.createRewardedVideoAd({
          posId: '40690'
        })
        rewardedVideoAd.onLoad(() => {
          AdManager.getInstance().vedioLoaded = true;
          console.log('joypac 激励视频加载成功')
          // rewardedVideoAd.show()
        })
        rewardedVideoAd.onError((err) => {
          AdManager.getInstance().vedioLoaded = false;
          console.log("joypac " + JSON.stringify(err));
        })
        resolve(rewardedVideoAd);
      })
    } else if (this.name === "tt") {
      return new Promise((resolve, reject) => {
        // 填入微信
        var rewardedVideoAd = tt.createRewardedVideoAd({
          adUnitId: '85bj580aa8hge1dj8i'
        });

        rewardedVideoAd.onError(function (err) {
          console.log(err);
          resolve(rewardedVideoAd);
        }.bind(this))



        rewardedVideoAd.onClose(function (res) {
          var result = {
            start: false,
            finish: false
          };
          // 用户点击了【关闭广告】按钮
          // 小于 2.1.0 的基础库版本，res 是一个 undefined
          if (res && res.isEnded || res === undefined) {
            // 正常播放结束，可以下发游戏奖励
            result.finish = true;
            console.log(result);
            this.onEnd(result);
          } else {
            console.log(result);
            this.onEnd(result);
            // 播放中途退出，不下发游戏奖励
          }
        }.bind(this))

        rewardedVideoAd.load()
          .then(() => resolve(rewardedVideoAd))
          .catch(err => {
            console.log(err.errMsg)
            resolve(rewardedVideoAd);
          })
      })
    }
  }

  reloadVedio(vedio) {
    vedio.load();
  }

  vedioPlay(vedio, onPlay, onEnd) {
    if (this.name === "qqplay") {
      // return new Promise((resolve, reject) => {\
      var result = {
        start: false,
        finish: false
      };
      vedio.setEventCallack(
        function (code, msg) {
          BK.Script.log(1, 1, "closeGame"); //关闭游戏（不再使用不需要监听） 
        }.bind(this),
        function (code, msg) {
          if (code === 0) {
            result.finish = true;
            //达到看广告时长要求，可以下发奖励 
          } else {

          }
        }.bind(this),
        function (code, msg) {
          if (code === 0) {
            onEnd(result);
            // resolve(result);//关闭视频webview 
          } else {

          }
        }.bind(this),
        function (code, msg) {
          if (code === 0) {
            // result.start = true;
            // resolve(result);
            //开始播放视频 
            onPlay();
          } else {

          }
        }.bind(this)
      )
      vedio.jump();
      // });
      // if (args.length === 3) {

      // }
    }
    if (this.name === "wxgame") {

      // vedio.onClose(function (res) {
      //   // 用户点击了【关闭广告】按钮
      //   // 小于 2.1.0 的基础库版本，res 是一个 undefined
      //   if (res && res.isEnded || res === undefined) {
      //     // 正常播放结束，可以下发游戏奖励
      //     result.finish = true;
      //     console.log(result);
      //     onEnd(result);
      //   } else {
      //     console.log(result);
      //     onEnd(result);
      //     // 播放中途退出，不下发游戏奖励
      //   }
      // }.bind(this))
      platform.onEnd = onEnd;
      vedio.show()
        .then(function () {
          onPlay()
        }.bind(this))
        .catch(err =>
          vedio.load().then(
            () => vedio.show()
          ));
    }
    if (this.name === "baidu") {

      // vedio.onClose(function (res) {
      //   // 用户点击了【关闭广告】按钮
      //   // 小于 2.1.0 的基础库版本，res 是一个 undefined
      //   if (res && res.isEnded || res === undefined) {
      //     // 正常播放结束，可以下发游戏奖励
      //     result.finish = true;
      //     console.log(result);
      //     onEnd(result);
      //   } else {
      //     console.log(result);
      //     onEnd(result);
      //     // 播放中途退出，不下发游戏奖励
      //   }
      // }.bind(this))
      platform.onEnd = onEnd;
      vedio.show()
        .then(function () {
          onPlay()
        }.bind(this))
        .catch(err =>
          vedio.load().then(
            () => vedio.show()
          ));
    }
    if (this.name === "oppo") {

      vedio.onClose(function (res) {
        var result = {
          start: false,
          finish: false
        };
        SoundManager.getInstance().playBGM();
        egret.ticker.resume();
        if (res && res.isEnded) {
          result.finish = true;
          console.log(result);
          onEnd(result);
        } else {
          console.log(result);
          onEnd(result);
        }
      });
      vedio.show().then(function () {
        onPlay()
      }, () => { }).catch(function (err) {
        vedio.load().then(function () {
          vedio.show()
        })
      }, () => { });
    }
    if (this.name === "mi") {
      var content = {
        adType: '1',
        adId: '21c9f49ceec061102301'
      }
      console.log("joypac播放视频");
      XMGame.game_show_ad(content, function (adData) {
        console.log("joypac" + adData.result);
        console.log("joypac" + adData.hasGetAd);
        onPlay();
        if (adData.hasGetAd) {
          if (adData.result) {
            onEnd({
              finish: true
            });
          } else {
            onEnd({
              finish: false
            });
          }
        } else {
          onEnd({
            finish: false
          });
        }
      })
    }
    if (this.name === "qg") {
      vedio.onVideoStart(() => {
        onPlay();
        console.log('激励视频 开始播放')
      })
      vedio.onRewarded(() => {
        onEnd({
          finish: true
        });
        console.log('激励视频广告完成，发放奖励');
        vedio.load();
      })
      vedio.show()
    }
    if (this.name === "tt") {


      this.onEnd = onEnd;

      vedio.show()
        .then(function () {
          onPlay()
        }.bind(this))
        .catch(err =>
          vedio.load().then(
            () => vedio.show()
          ));
    }
  }

  fetchInterstitial() {
    if (this.name === "oppo") {
      return new Promise((resolve, reject) => {
        var interstitialAd = opUnion.createInterstitialAd({
          posId: '33044',
          mediaId: '101000219'
        })
        console.log('开始插屏广告加载');

        interstitialAd.onLoad(function () {
          // resolve(interstitialAd);
          // interstitialAd.offLoad();

        })

        interstitialAd.onError(function (err) {
          // resolve(null);

        })

        resolve(interstitialAd);
      })
    } else if (this.name === "qg") {
      return new Promise((resolve, reject) => {
        let interstitialAd = qg.createInsertAd({
          posId: '40691'
        })
        interstitialAd.onLoad(() => {
          console.log('joypac 插屏广告加载')
        })
        interstitialAd.onError((err) => {
          console.log("joypac 插屏错误" + JSON.stringify(err));
          interstitialAd.load();
        })
        interstitialAd.load();
        resolve(interstitialAd);
      })
    } else if (this.name === "wxgame") {
      if (wx.createInterstitialAd){
        interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-07eae89cea1c4cfd'
        })
      }
      resolve(interstitialAd);
    }

  }

  showInterstitial(interstitialAd) {
    if (this.name === "oppo") {
      interstitialAd.onClose(function () {
        SoundManager.getInstance().playBGM();
        egret.ticker.resume();
      }.bind(this))
      interstitialAd.show().catch(function (err) {
        interstitialAd.load().then(function () {
          interstitialAd.show();
        })
      }, () => { })
    }
    if (this.name === "qg") {
      console.log("joypac 显示插屏");
      interstitialAd.onShow(() => {
        console.log('插屏广告展示');
        interstitialAd.load();
      });
      interstitialAd.show();
    }
    if (this.name === "wxgame") {
      interstitialAd.onShow(() => {
        interstitialAd.load();
      });
      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }
    }
  }

  getUserInfo() {
    if (this.name === "wxgame") {
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var gender = userInfo.gender //性别 0：未知、1：男、2：女
          var province = userInfo.province
          var city = userInfo.city
          var country = userInfo.country
          resolve(userInfo);
        }
      })
    }
    else if (this.name === "baidu") {
      swan.getUserInfo({
        withCredentials: true,
        success: function (res) {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var gender = userInfo.gender //性别 0：未知、1：男、2：女
          var province = userInfo.province
          var city = userInfo.city
          var country = userInfo.country
          resolve(userInfo);
        }
      })
    } else if (this.name === "mi") {
      //获取用户信息
      XMGame.get_userinfo(callback) // 获取用户头像和名称等信息

      function callback(userInfo) {
        if (userInfo && Object.prototype.toString.call(userInfo) === '[object Object]') {
          console.log(userInfo)
          console.log(userInfo.nickName)
          console.log(userInfo.avatar) // url
          console.log('获取到了用户数据')
        }
      }

    }


  }

  login() {
    if (this.name === "wxgame") {
      wx.login({
        success: function (res) {
          var recordChannel = egret.localStorage.getItem("channel");
          if (recordChannel === undefined || recordChannel === "") {
            wx.aldSendEvent('渠道导入', {
              'channel': window.channel
            });
            wx.getSystemInfo({
              success(res) {
                wx.aldSendEvent(recordChannel + '设备信息', {
                  'brand': res.brand,
                  'model': res.model,
                  "version": res.version
                });
              }
            })
            wx.getNetworkType({
              success(res) {
                const networkType = res.networkType;
                wx.aldSendEvent(recordChannel + '网络类型', {
                  networkType: res.networkType
                });
              }
            })
            egret.localStorage.setItem("channel", window.channel);
            if (window.channel.indexOf("mintegral") !== -1) {
              wx.getUserInfo({
                success: res => {
                  console.log("获取用户信息成功");
                  var userInfo = res.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                  var province = userInfo.province;
                  var city = userInfo.city;
                  var country = userInfo.country;
                },
                fail: res => {
                  console.log("获取用户信息失败");
                  let sysInfo = wx.getSystemInfoSync();
                  let sdkVersion = sysInfo.SDKVersion;
                  if (sdkVersion >= "2.0.1") {
                    var width = window.innerWidth / 2 - 80;
                    var height = window.innerHeight * 3 / 4 - 20;
                    console.log(width);
                    console.log(height);
                    platform.infoButtonActive = true;
                    platform.infoButton = wx.createUserInfoButton({
                      type: 'image',
                      text: '',
                      image: "./timg.png",
                      style: {
                        left: 0,
                        top: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        backgroundColor: '#ff0000',
                        color: '#ffffff',
                      }
                    });
                    platform.infoButton.onTap((res) => {
                      if (res.userInfo) {
                        console.log("用户授权:", res);
                        var userInfo = res.userInfo;
                        var nickName = userInfo.nickName;
                        var avatarUrl = userInfo.avatarUrl;
                        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                        var province = userInfo.province;
                        var city = userInfo.city;
                        var country = userInfo.country;
                        platform.infoButton.destroy();
                        console.log("授权成功");
                        platform.infoButtonActive = false;
                        wx.aldSendEvent('授权成功', {
                          'Channel': window.channel
                        });
                      } else {
                        platform.infoButton.destroy();
                        console.log("授权失败");
                        platform.infoButtonActive = false;
                        wx.aldSendEvent('授权失败', {
                          'Channel': window.channel
                        });
                      }
                    });
                  } else {
                    wx.showModal({
                      title: '友情提醒',
                      content: '请允许获取用户信息',
                      confirmText: "授权",
                      showCancel: false,
                      success: res => {
                        if (res.confirm) {
                          console.log('用户点击确定');
                          wx.authorize({
                            scope: 'scope.userInfo',
                            success() {
                              console.log("授权成功");
                              wx.aldSendEvent('授权成功', {
                                'Channel': window.channel
                              });
                            },
                            fail: (res) => {
                              console.log("授权失败");
                              wx.aldSendEvent('授权失败', {
                                'Channel': window.channel
                              });
                            }
                          })
                        } else if (res.cancel) {
                          console.log('用户点击取消');
                          wx.aldSendEvent('授权失败', {
                            'Channel': window.channel
                          });
                        }
                      }
                    });
                  }

                }
              });
            }
          }
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        },
      })
    } else if (this.name === "tt") {
      tt.login({
        success(res) {
          console.log(`login调用成功${res.code} ${res.anonymousCode}`);
        },
        fail(res) {
          console.log(`login调用失败`);
        }
      });
    }

  }

  getGameRecorderManager() {
    if (this.platform.name === "tt") {
      return tt.getGameRecorderManager();
    }
    else if (this.platform.name === "baidu") {
      var phone = swan.getSystemInfoSync();

      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10401) {
        return;
      }
      return swan.getVideoRecorderManager();
    }
  }

  stopRecord() {

    if (platform.name === "tt") {
      tt.getGameRecorderManager().stop();
    }
    else if (platform.name === "baidu") {
      var phone = swan.getSystemInfoSync();

      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10401) {
        return;
      }
      console.log("stop");
      swan.getVideoRecorderManager().stop();
    }
  }

  pauseRecord() {

    if (platform.name === "tt") {
      tt.getGameRecorderManager().pause();
    }
    else if (platform.name === "baidu") {
      var phone = swan.getSystemInfoSync();

      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10401) {
        return;
      }
      console.log("pause");
      swan.getVideoRecorderManager().pause();
    }
  }

  resumeRecord() {

    if (platform.name === "tt") {
      tt.getGameRecorderManager().resume();
    }
    else if (platform.name === "baidu") {
      var phone = swan.getSystemInfoSync();

      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10401) {
        return;
      }
      console.log("resume");
      swan.getVideoRecorderManager().resume();
    }
  }

  startRecord() {

    if (platform.name === "tt") {
      console.log("录屏开始");
      tt.getGameRecorderManager().onStart(res => {
        // 录屏开始
        console.log(res);
        console.log(res.microphoneStatus);
        // do somethine;
      })

      tt.getGameRecorderManager().onStop(res => {
        console.log("onStop");
        tt.getGameRecorderManager().clipVideo({
          path: res.videoPath,
          timeRange: [120, 0], // 表示裁剪录屏中的最后10s
          success(res) {
            console.log(res.videoPath);
            tt.setStorage({
              key: 'videoPath',
              data: res.videoPath,
              success(res) {
                console.log(`setStorage调用成功`);
              },
              fail(res) {
                console.log(`setStorage调用失败`);
              }
            });
          },
          fail(e) { }
        })
        // 录屏结束;

      })

      tt.getGameRecorderManager().onPause(() => {
        console.log("onPause");
        // 录屏已暂停;
      })

      tt.getGameRecorderManager().onResume(() => {
        console.log("onResume");
        // 录屏已恢复;
      })

      console.log("recorder start")

      tt.getGameRecorderManager().start({
        duration: 30,
        microphoneEnabled: false,
      })
    }
    else if (platform.name === "baidu") {
      var phone = swan.getSystemInfoSync();

      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10401) {
        return;
      }
      console.log("录屏开始");
      swan.getVideoRecorderManager().onStart(res => {
        // 录屏开始
        console.log(res);
        console.log(res.microphoneStatus);
        // do somethine;
      })

      swan.getVideoRecorderManager().onStop(res => {
        console.log("onStop");
        console.log(res.videoPath);
        swan.setStorage({
          key: 'videoPath',
          data: res.videoPath,
          success(res) {
            console.log(res);
            console.log(`setStorage调用成功`);
          },
          fail(res) {
            console.log(`setStorage调用失败`);
          }
        });
        // 录屏结束;

      })
      swan.getVideoRecorderManager().onPause(() => {
        console.log("onPause");
        // 录屏已暂停;
      })
      swan.getVideoRecorderManager().onResume(() => {
        console.log("onResume");
        // 录屏已恢复;
      })
      console.log("recorder start")
      swan.getVideoRecorderManager().start({
        duration: 30,
        microphoneEnabled: false,
      })
    }
  }

  shareVedio(onShare) {
    console.log("shareVedio(onShare)");
    if (platform.name === "tt") {
      let appname = tt.getSystemInfoSync().appName;
      if (appname === "Douyin") {
        onShare();
      }
      tt.getStorage({
        key: 'videoPath',
        success(res) {
          console.log(res);
          let titles = ["脑细胞快用光了，快来帮帮我", "这关太难了，求老铁们帮帮忙"];
          let randomNum = Math.floor(Math.random(2));
          console.log(titles[randomNum]);
          if (res.data) {
            tt.shareAppMessage({
              title: "脑细胞快用光了，快来帮帮我",
              channel: "video",
              extra: {
                "videoPath": res.data,
                "videoTopic": "回避不开心"
              },
              success() {
                onShare();
                console.log(`分享成功！`);
              },
              fail(e) {
                let title = "";
                if (e.errMsg.indexOf("3s") !== -1 || e.errMsg.indexOf("too short") !== -1) {
                  title += '视频太短啦\n请再次游戏重新录制';
                  tt.showToast({
                    title: title,
                    icon: 'none',
                    duration: 2000,
                    success(res) {
                      console.log(`${res}`);
                    },
                    fail(res) {
                      console.log(`showToast调用失败`);
                    }
                  });
                } else if (e.errMsg.indexOf("")) {
                  // title += '分享失败啦\n您取消了该次分享'
                }
                console.log(`分享失败！`);
              }
            });
            // tt.shareVideo({
            //   videoPath: res.data,
            //   success() {
            //     onShare();
            //     console.log(`分享成功！`);
            //   },
            //   fail(e) {
            //     console.log(`分享失败！`);
            //   }
            // })
            // request ad data
          }
        },
        fail(res) {
          console.log(`getStorage调用失败`);
        }
      });
    }
    else if (platform.name === "baidu") {
      var phone = swan.getSystemInfoSync();

      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10401) {
        return;
      }
      let appname = swan.getSystemInfoSync().appName;
      swan.getStorage({
        key: 'videoPath',
        success(res) {
          console.log(res);
          let titles = ["脑细胞快用光了，快来帮帮我", "这关太难了，求老铁们帮帮忙"];
          let randomNum = Math.floor(Math.random(2));
          console.log(titles[randomNum]);
          if (res.data) {
            console.log(res);
            swan.shareVideo({
              videoPath: res.data,
              success() {
                console.log('分享成功');
              },
              fail(res) {
                console.log('分享失败');
              }
            });

            // swan.shareAppMessage({
            //   title: "脑细胞快用光了，快来帮帮我",
            //   channel: "video",
            //   extra: {
            //     "videoPath": res.data,
            //     "videoTopic": "回避不开心"
            //   },
            //   success() {
            //     onShare();
            //     console.log(`分享成功！`);
            //   },
            //   fail(e) {
            //     let title = "";
            //     if (e.errMsg.indexOf("3s") !== -1 || e.errMsg.indexOf("too short") !== -1) {
            //       title += '视频太短啦\n请再次游戏重新录制';
            //       swan.showToast({
            //         title: title,
            //         icon: 'none',
            //         duration: 2000,
            //         success(res) {
            //           console.log(`${res}`);
            //         },
            //         fail(res) {
            //           console.log(`showToast调用失败`);
            //         }
            //       });
            //     } else if (e.errMsg.indexOf("")) {
            //       // title += '分享失败啦\n您取消了该次分享'
            //     }
            //     console.log(`分享失败！`);
            //   }
            // });
            // tt.shareVideo({
            //   videoPath: res.data,
            //   success() {
            //     onShare();
            //     console.log(`分享成功！`);
            //   },
            //   fail(e) {
            //     console.log(`分享失败！`);
            //   }
            // })
            // request ad data
          }
        },
        fail(res) {
          console.log(`getStorage调用失败`);
        }
      });
    }
  }

  showTip(title) {
    tt.showToast({
      title: title,
      icon: 'none',
      duration: 2000,
      success(res) {
        console.log(`${res}`);
      },
      fail(res) {
        console.log(`showToast调用失败`);
      }
    });
  }

  getSaveData() {

  }

  setSaveData() {

  }

  rankView(show = true) {
    if (this.name === "wxgame") {
      // if (show) {
      //     platform.openDataContext.postMessage({
      //         isDisplay: true,
      //         text: 'hello',
      //         year: (new Date()).getFullYear(),
      //         command: "open"
      //     });
      // } else {
      //     platform.openDataContext.postMessage({
      //         isDisplay: false,
      //         text: 'hello',
      //         year: (new Date()).getFullYear(),
      //         command: "close"
      //     });
      // }
    } else if (this.name === "oppo") {
      OPPO.openRankPage();
    } else {
      UIManager.getInstance().toRankScene();
    }
  }

  createRecommendation() {
    if (this.name === "baidu") {
      var phone = swan.getSystemInfoSync();

      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10503) {
        return;
      }
      this.recommendationButton = swan.createRecommendationButton({
        type: 'list',
        style: {
          left: 100,
          top: (phone.screenHeight - 1136 / phone.pixelRatio) / 2
        }
      });
    }

  }
  loadRecommendation() {
    if (this.name === "baidu") {

      var phone = swan.getSystemInfoSync();
      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10503) {
        return;
      }
      console.log("loadRecommendation");
      // 获取按钮高宽、坐标
      console.log(this.recommendationButton.style)

      // 监听错误信息
      this.recommendationButton.onError((e) => {
        console.error(e);
      })

      // 监听按钮资源加载完成
      this.recommendationButton.onLoad(() => {
        // 显示按钮
        this.recommendationButton.show();

        // 取消监听加载事件
        this.recommendationButton.offLoad(() => { })
        console.log("onLoad");
        // 更新坐标位置
        this.recommendationButton.style.left = phone.screenWidth - phone.screenWidth / 640 * 500;
        this.recommendationButton.style.top = (phone.screenHeight - (phone.screenWidth / 640) * 1094) / 2;
        // setTimeout(()=>{
        //     // 隐藏按钮
        //     this.recommendationButton.hide();

        //     // 销毁按钮
        //     this.recommendationButton.destroy();

        //     // 取消监听错误事件
        //     this.recommendationButton.offError();
        // }, 10000)
      })
      // 触发资源加载
      this.recommendationButton.load();
    }

  }
  showRecommendation() {
    console.log("show recommendation");
    if (this.name === "baidu") {
      var phone = swan.getSystemInfoSync();
      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10503) {
        return;
      }
      this.recommendationButton.show();
    }
  }
  hideRecommendation() {
    if (this.name === "baidu") {
      console.log("hide recommendation");
      var phone = swan.getSystemInfoSync();
      var version = phone.SDKVersion.split(".");
      let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
      console.log(numberVersion);
      if (numberVersion < 10503) {
        return;
      }
      // 隐藏按钮
      this.recommendationButton.hide();
    }
  }
  hasBannerSDK() {
    switch (this.name) {
      case "wxgame":
        return true;
      case "qqplay":
        return true;
      case "oppo":
        return true;
      case "mi":
        return false;
      case "qg":
        return true;
      case "tt":
        return true;
      case "baidu":
        return true;
      default:
        return false;
    }
  }

  hasInterstitialSDK() {
    switch (this.name) {
      case "wxgame":
        return true;
      case "qqplay":
        return false;
      case "oppo":
        return true;
      case "mi":
        return false;
      case "qg":
        return true;
      case "tt":
        return false;
      default:
        return false;
    }
  }

  hasVedioSDK() {
    switch (this.name) {
      case "wxgame":
        return true;
      case "qqplay":
        return true;
      case "oppo":
        return true;
      case "mi":
        return true;
      case "qg":
        return true;
      case "tt":
        return true;
      case "baidu":

        return true;
      default:
        return false;
    }
  }

  hasShareSDK() {
    switch (this.name) {
      case "wxgame":
        return true;
      case "qqplay":
        return true;
      case "oppo":
        return false;
      case "mi":
        return false;
      case "qg":
        return false;
      case "tt":
        return true;
      default:
        return false;
    }
  }

  hasShareVedioSDK() {
    switch (this.name) {
      case "wxgame":
        return false;
      case "qqplay":
        return false;
      case "oppo":
        return false;
      case "mi":
        return false;
      case "qg":
        return false;
      case "tt":
        return true;
      case "baidu":
        var phone = swan.getSystemInfoSync();

        var version = phone.SDKVersion.split(".");
        let numberVersion = Number(version[0]) * 10000 + Number(version[1]) * 100 + Number(version[2]);
        if (numberVersion < 10503) {
          return false;
        }
        return true;
      default:
        return false;
    }
  }
  // openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

  createDisplayObject(type, width, height) {
    const bitmapdata = new egret.BitmapData(sharedCanvas);
    bitmapdata.$deleteSource = false;
    const texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);
    const bitmap = new egret.Bitmap(texture);
    bitmap.width = width;
    bitmap.height = height;

    if (egret.Capabilities.renderMode == "webgl") {
      const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
      const context = renderContext.context;
      ////需要用到最新的微信版本
      ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
      ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
      if (!context.wxBindCanvasTexture) {
        egret.startTick((timeStarmp) => {
          egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
          bitmapdata.webGLTexture = null;
          return false;
        }, this);
      }
    }
    return bitmap;
  }


  postMessage(data) {
    const openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage(data);
  }
}

/**
 * 发布后，拷入该平台，只需要更换具体平台名称的
 */
// WXGAME = 'wxgame';
// QQPLAY = 'qqplay';
// OPPO = 'oppo';
// MI = 'mi'



window.platform = new E8Platform();
window.platform.name = "wxgame";


window.platform.openDataContext = new WxgameOpenDataContext();