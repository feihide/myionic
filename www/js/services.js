var return_url;
angular.module('my.services', [])
  .factory('global', function(localStorageService, $state) {
    var UserInfo, AccessToken, city;
    UserInfo = localStorageService.get('user_info');
    AccessToken = localStorageService.get('access_token');
    city = 'beijing';
    return {
      device_type: "wechat",
      user_info: UserInfo,
      city: city,
      access_token: AccessToken,
      goto: function() {
        localStorageService.clear('access_token');
        localStorageService.clear('user_info');
        this.access_token = '';
        this.user_info = '';
        $state.go('tab.login');
      }
    };

  })

  .factory('apis', function($http, global, $ionicPopup) {
    // Might use a resource here that returns a JSON array
    var host = "http://127.0.0.1:8000";
    var urlEncode = function(param, key, encode) {
      if (param == null) return '';
      var paramStr = '';
      var t = typeof (param);
      if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += urlEncode(param[i], k, encode);
        }
      }
      return paramStr;
    };

    var post = function(url, params, callback) {

      var p_url = host + url + '?device_type=' + global.device_type;

      if (global.access_token != null) {
        p_url = p_url + '&access_token=' + global.access_token;
      }

      $http.post(p_url, urlEncode(params)).success(function(data) {

        callback(data);
      });
    }

    var get = function(url, params, callback) {

      var g_url = host + url + '?device_type=' + global.device_type;
      if (global.access_token != null) {
        g_url = g_url + '&access_token=' + global.access_token;
      }
      $http.get(g_url + urlEncode(params)).success(function(data) {
        callback(data);
      });
    }
    var jsonp = function(url, params, callback) {
      startTime = new Date().getTime();

      var g_url = host + url + '?device_type=' + global.device_type;

      //   $ionicPopup.alert({
      //     title: '响应',
      //     template: g_url
      //   });

      if (global.access_token != null) {
        g_url = g_url + '&access_token=' + global.access_token;
      }
      g_url = g_url + '&callback=JSON_CALLBACK';
      console.log(g_url);

      $http.jsonp(g_url + urlEncode(params)).success(function(data) {
        callback(data);
      }).error(function(resp, status, header, config) {
        var respTime = new Date().getTime() - startTime;
        if (respTime >= 10) {
          alert('time out');
        //time out handeling
        } else {
          //other error hanndling
          alert('other error');
        }
      });
    }
    //所有接口这里定义
    return {
      //test
      get_fetch: function(params, callback) {
        return jsonp('/polls/get', params, callback);
      },
      del_fetch: function(params, callback) {
        return jsonp('/polls/del', params, callback);
      },
      favor_fetch: function(params, callback) {
        return jsonp('/polls/favor', params, callback);
      },
      get_one: function(params, callback) {
        return jsonp('/polls/one', params, callback);
      },
      p_flow_static: function(params, callback) {
        return post('/', params, callback);
      },
      //获取一级分类
      g_category_top: function(params, callback) {
        return get('/c_category/top', params, callback);
      },
      //获取二级分类
      g_category_sub: function(params, callback) {
        return get('/c_category/sub', params, callback);
      },
      //获取指定城市首页活动列表
      g_city_activity: function(params, callback) {
        return get('/c_city/activitylist', params, callback);
      },
      //获取指定城市城区列表
      g_city_region: function(params, callback) {
        return get('/c_common/regionlist', params, callback);
      },
      //获取城市列表
      g_city_list: function(params, callback) {
        return get('/c_common/citylist', params, callback);
      },
      //返回用户下单商品中可用的优惠券列表
      p_coupon_list: function(params, callback) {
        return post('/c_coupon/couponlist', params, callback);
      },
      //获取现金券列表
      p_coupon_cash: function(params, callback) {
        return post('/c_coupon/list', params, callback);
      },
      //获取消息列表
      g_message_list: function(params, callback) {
        return get('/c_message/list', params, callback);
      },
      //获取未读的消息列表
      g_message_unready: function(params, callback) {
        return get('/c_message/count', params, callback);
      },
      //用户争议列表
      g_dispute_list: function(params, callback) {
        return get('/c_order/usertroversy', params, callback);
      },
      //创建争议
      p_dispute_create: function(params, callback) {
        return post('/c_order/troversy', params, callback);
      },
      //取消争议
      p_dispute_cancel: function(params, callback) {
        return post('/c_order/cancel', params, callback);
      },
      //同意争议
      p_dispute_agree: function(params, callback) {
        return post('/c_order/agree', params, callback);
      },
      //争议拒绝
      p_dispute_refused: function(params, callback) {
        return post('/c_order/refused', params, callback);
      },
      //订单生成
      p_order_create: function(params, callback) {
        return post('/c_order/create', params, callback);
      },
      //取消订单
      p_order_cancel: function(params, callback) {
        return post('/c_order/cancle', params, callback);
      },
      //删除订单
      p_order_delete: function(params, callback) {
        return post('/c_order/delete', params, callback);
      },
      //确认、拒绝收货
      p_order_receive: function(params, callback) {
        return post('/c_order/receive');
      },
      //获取订单评分
      g_order_score: function(params, callback) {
        return get('/c_order/getscore', params, callback);
      },
      //获取订单列表
      g_order_list: function(params, callback) {
        return get('/c_order/list', params, callback);
      },
      //订单商品列表
      c_order_skus: function(params, callback) {
        return get('/c_order/orderskulist', params, callback);
      },
      //获取指定订单详情
      g_order_detail: function(params, callback) {
        return get('/c_order/detail', params, callback);
      },
      //评分订单
      p_order_score: function(params, callback) {
        return post('/c_order/score', params, callback);
      },
      //评论订单
      p_order_comment_add: function(params, callback) {
        return post('/c_order/addcomment', params, callback);
      },
      //店铺修改
      p_shop_udate: function(params, callback) {
        return post('/c_shop/update', params, callback);
      },
      //店铺创建
      p_shop_create: function(params, callback) {
        return post('/c_shop/create', params, callback);
      },
      //店铺列表
      g_shop_list: function(params, callback) {
        return get('/c_shop/list', params, callback);
      },
      //店铺删除
      p_shop_delete: function(params, callback) {
        return post('/c_shop/delete', params, callback);
      },
      //店铺详情
      g_shop_detail: function(params, callback) {
        return get('/c_shop/detail', params, callback);
      },
      //商品单位列表
      g_unit_list: function(params, callback) {
        return get('/c_sku/getDict', params, callback);
      },
      //商品详细信息
      g_sku_detail: function(params, callback) {
        return get('/c_sku/detail', params, callback);
      },
      //收藏商品
      p_sku_collect_create: function(params, callback) {
        return post('/c_sku/addfavor', params, callback);
      },
      //收藏的商品列表
      g_sku_collect_list: function(params, callback) {
        return get('/c_sku/listfavor', params, callback);
      },
      //取消商品收藏
      p_sku_collect_cancel: function(params, callback) {
        return post('/c_sku/delfavor', params, callback);
      },
      //商品列表
      g_sku_list: function(params, callback) {
        return get('/c_sku/list', params, callback);
      },
      //获取常用商品列表
      g_sku_common: function(params, callback) {
        return get('/c_sku/common', params, callback);
      },
      //商品历史搜索列表
      p_sku_search_history: function(params, callback) {
        return post('/c_sku/hissearch', params, callback);
      },
      //清除历史搜索记录
      p_sku_search_delete: function(params, callback) {
        return post('/c_sku/delhissearch', params, callback);
      },
      //商品搜索接口
      g_sku_search: function(params, callback) {
        return get('/c_sku/search', params, callback);
      },
      //获取热门搜索词
      g_sku_hot_search: function(params, callback) {
        return get('/c_sku/hotsearch', params, callback);
      },
      //购物车商品验证
      p_sku_verify: function(params, callback) {
        return post('/c_sku/shopskuverify', params, callback);
      },
      //修改用户密码
      p_user_pwd_update: function(params, callback) {
        return post('/c_user/editpwd', params, callback);
      },
      //用户冻结明细
      g_user_freeze: function(params, callback) {
        return get('/c_user/freeze', params, callback);
      },
      //历史交易列表
      g_user_trades_list: function(params, callback) {
        return get('/c_user/getrechargelist', params, callback);
      },
      //发送验证码、重置密码
      p_user_sendsms: function(params, callback) {
        return post('/c_user/sendsms', params, callback);
      },
      //完善用户资料
      p_user_perfect: function(params, callback) {
        return post('/c_user/perfect', params, callback);
      },
      //更改合单状态
      p_user_changesinglestatus: function(params, callback) {
        return post('/c_user/changesinglestatus', params, callback);
      },
      //用户充值
      p_user_recharge: function(params, callback) {
        return post('/c_user/addRecharge', params, callback);
      },
      //用户收支记录
      g_user_income: function(params, callback) {
        return get('/c_user/income', params, callback);
      },
      //用户注册
      p_user_reg: function(params, callback) {
        return post('/c_user/reg', params, callback);
      },
      //用户登录
      p_user_login: function(params, callback) {
        return post('/c_user/login', params, callback);
      },
      //用户登出
      g_user_logout: function(params, callback) {
        return get('/c_user/logout', params, callback);
      },
      //获取用户详细信息
      g_user_info: function(params, callback) {
        return get('/c_user/getuserinfo', params, callback);
      }
    };
  })
  .factory('currentUser', [function(localStorageService) {

    return {
      add: function(userInfo, value) {
        //localStorageService.update(userInfo,value);
      },
      get: function() {},
      delete: function() {}
    }
  }])

  .factory('localStorageService', [function() {
    return {
      get: function localStorageServiceGet(key, defaultValue) {
        var stored = localStorage.getItem(key);
        try {
          stored = angular.fromJson(stored);
        } catch (error) {
          stored = null;
        }
        if (defaultValue && stored === null) {
          stored = defaultValue;
        }
        return stored;
      },
      update: function localStorageServiceUpdate(key, value) {
        if (value) {
          localStorage.setItem(key, angular.toJson(value));
        }
      },
      clear: function localStorageServiceClear(key) {
        localStorage.removeItem(key);
      }
    };
  }])
  .factory('dateService', [function() {
    return {
      handleMessageDate: function(messages) {
        var i = 0,
          length = 0,
          messageDate = {},
          nowDate = {},
          weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
          diffWeekValue = 0;
        if (messages) {
          nowDate = this.getNowDate();
          length = messages.length;
          for (i = 0; i < length; i++) {
            messageDate = this.getMessageDate(messages[i]);
            if (!messageDate) {
              return null;
            }
            if (nowDate.year - messageDate.year > 0) {
              messages[i].lastMessage.time = messageDate.year + "";
              continue;
            }
            if (nowDate.month - messageDate.month >= 0 ||
              nowDate.day - messageDate.day > nowDate.week) {
              messages[i].lastMessage.time = messageDate.month +
                "月" + messageDate.day + "日";
              continue;
            }
            if (nowDate.day - messageDate.day <= nowDate.week &&
              nowDate.day - messageDate.day > 1) {
              diffWeekValue = nowDate.week - (nowDate.day - messageDate.day);
              messages[i].lastMessage.time = weekArray[diffWeekValue];
              continue;
            }
            if (nowDate.day - messageDate.day === 1) {
              messages[i].lastMessage.time = "昨天";
              continue;
            }
            if (nowDate.day - messageDate.day === 0) {
              messages[i].lastMessage.time = messageDate.hour + ":" + messageDate.minute;
              continue;
            }
          }
        // console.log(messages);
        // return messages;
        } else {
          console.log("messages is null");
          return null;
        }

      },
      getNowDate: function() {
        var nowDate = {};
        var date = new Date();
        nowDate.year = date.getFullYear();
        nowDate.month = date.getMonth();
        nowDate.day = date.getDate();
        nowDate.week = date.getDay();
        nowDate.hour = date.getHours();
        nowDate.minute = date.getMinutes();
        nowDate.second = date.getSeconds();
        return nowDate;
      },
      getMessageDate: function(message) {
        var messageDate = {};
        var messageTime = "";
        //2015-10-12 15:34:55
        var reg = /(^\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/g;
        var result = new Array();
        if (message) {
          messageTime = message.lastMessage.originalTime;
          result = reg.exec(messageTime);
          if (!result) {
            console.log("result is null");
            return null;
          }
          messageDate.year = parseInt(result[1]);
          messageDate.month = parseInt(result[2]);
          messageDate.day = parseInt(result[3]);
          messageDate.hour = parseInt(result[4]);
          messageDate.minute = parseInt(result[5]);
          messageDate.second = parseInt(result[6]);
          // console.log(messageDate);
          return messageDate;
        } else {
          console.log("message is null");
          return null;
        }
      }
    };
  }])

  .factory('guidService', ['localStorageService', function(localStorageService) {
    var createGuid = function() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    return {
      get: function() {
        guid = localStorageService.get('guid');
        if (!guid) {
          guid = createGuid();
          localStorageService.update('guid', guid);
        }
        return guid;
      }
    }


  }])

  .factory('messageService', ['localStorageService', 'dateService',
    function(localStorageService, dateService) {
      return {
        init: function(messages) {
          var i = 0;
          var length = 0;
          var messageID = new Array();
          var date = null;
          var messageDate = null;
          if (messages) {
            length = messages.length;
            for (; i < length; i++) {
              messageDate = dateService.getMessageDate(messages[i]);
              if (!messageDate) {
                return null;
              }
              date = new Date(messageDate.year, messageDate.month,
                messageDate.day, messageDate.hour, messageDate.minute,
                messageDate.second);
              messages[i].lastMessage.timeFrome1970 = date.getTime();
              messageID[i] = {
                id: messages[i].id
              };

            }
            localStorageService.update("messageID", messageID);
            for (i = 0; i < length; i++) {
              localStorageService.update("message_" + messages[i].id, messages[i]);
            }
          }
        },
        getAllMessages: function() {
          var messages = new Array();
          var i = 0;
          var messageID = localStorageService.get("messageID");
          var length = 0;
          var message = null;
          if (messageID) {
            length = messageID.length;

            for (; i < length; i++) {
              message = localStorageService.get("message_" + messageID[i].id);
              if (message) {
                messages.push(message);
              }
            }
            dateService.handleMessageDate(messages);
            return messages;
          }
          return null;

        },
        getMessageById: function(id) {
          return localStorageService.get("message_" + id);
        },
        getAmountMessageById: function(num, id) {
          var messages = [];
          var message = localStorageService.get("message_" + id).message;
          var length = 0;
          if (num < 0 || !message) return;
          length = message.length;
          if (num < length) {
            messages = message.splice(length - num, length);
            return messages;
          } else {
            return message;
          }
        },
        updateMessage: function(message) {
          var id = 0;
          if (message) {
            id = message.id;
            localStorageService.update("message_" + id, message);
          }
        },
        deleteMessageId: function(id) {
          var messageId = localStorageService.get("messageID");
          var length = 0;
          var i = 0;
          if (!messageId) {
            return null;
          }
          length = messageId.length;
          for (; i < length; i++) {
            if (messageId[i].id === id) {
              messageId.splice(i, 1);
              break;
            }
          }
          localStorageService.update("messageID", messageId);
        },
        clearMessage: function(message) {
          var id = 0;
          if (message) {
            id = message.id;
            localStorageService.clear("message_" + id);
          }
        }
      };
    }
  ])
  .factory('Push', function() {
    var push;
    return {
      setBadge: function(badge) {
        if (push) {
          console.log('jpush: set badge', badge);
          plugins.jPushPlugin.setBadge(badge);
        }
      },
      setAlias: function(alias) {
        if (push) {
          console.log('jpush: set alias', alias);
          plugins.jPushPlugin.setAlias(alias);
        }
      },
      check: function() {
        if (window.jpush && push) {
          plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
          window.jpush = null;
        }
      },
      init: function(notificationCallback) {
        console.log('jpush: start init-----------------------');
        push = window.plugins && window.plugins.jPushPlugin;
        if (push) {
          console.log('jpush: init');
          plugins.jPushPlugin.init();
          plugins.jPushPlugin.setDebugMode(true);
          plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;
          plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;
        }
      }
    };
  })
  //页面传参
  .factory('ParamsService', function() {
    //定义factory返回对象
    var myServices = {};
    //定义参数对象
    var myObject = {};
    var _set = function(data) {
      angular.extend(myObject, data);
    };
    var _get = function() {
      return myObject;
    };
    // Public APIs
    myServices.set = _set;
    myServices.get = _get;
    // 在controller中通过调set()和get()方法可实现提交或获取参数的功能
    return myServices;
  })
  .factory("sqlite", ["$cordovaSQLite",
    function(n) {
      var t = [];
      var d = [];
      return {
        allitem: function() {
          t = [];
          return n.execute(db, "SELECT * FROM item where isDel=0").then(function(n) {
              var i, r
              if (n.rows.length > 0) {
                for (i = 0; i < n.rows.length; i++) {
                  r = {
                    id: n.rows.item(i).id,
                    name: n.rows.item(i).name,
                    note: n.rows.item(i).note,
                    num: '',
                    createDate: n.rows.item(i).createDate,
                  };
                  t.push(r)
                }
              }
            }), t
        },
        getitem: function(id, back) {
          t = [];
          n.execute(db, "SELECT * FROM item where id=(?) and isDel=0", [id]).then(function(n) {
            if (n.rows.length > 0) {
              t.id = n.rows.item(0).id;
              t.name = n.rows.item(0).name;
              t.note = n.rows.item(0).note;
              t.createDate = n.rows.item(0).createDate;

            }
            back(t);
          })
        },
        additem: function(i) {
          n.execute(db, "INSERT INTO item (name , note,  createDate , isDel)                     VALUES (?,?,?,?)      ", [i.name, i.note, i.createDate, 0]).then(function(n) {
            var r = {
              id: n.insertId,
              name: i.name,
              note: i.note,
              createDate: i.createDate,
              isDel: 0
            };
          //t.push(r)
          })
        },
        updateitem: function(i) {
          n.execute(db, "UPDATE item SET  name    = (?) ,  note     = (?)   WHERE id      = (?)      ", [i.name, i.note, i.id]).then(function() {
            for (var n = 0; n < t.length; n++) t[n].id === parseInt(i.id) && (t[n] = i)
           })
        },
        removeitem: function(i, index) {
          //DELETE FROM item WHERE id = (?)"

          n.execute(db, "UPDATE item SET  isDel =1  WHERE id = (?)", [i]).then(function() {
            t.splice(index, 1);
          })
        },
        adddata: function(i, cb) {
          console.log(i);
          n.execute(db, "INSERT INTO item_data (name , num, note, createDate,ctime , isDel)                     VALUES (?,?,?,?,?,?)      ", [i.name, i.num, i.note, i.createDate, i.ctime, 0]).then(function(n) {
            cb();
          })
        },
        alldata: function(i) {
          d = [];
          return n.execute(db, "SELECT * FROM item_data where createDate=(?) and  isDel=0 order by id asc", [i]).then(function(n) {
              var i, r
              if (n.rows.length > 0) {
                for (i = 0; i < n.rows.length; i++) {
                  var newDate = new Date();
                  newDate.setTime(n.rows.item(i).ctime);
                  r = {
                    id: n.rows.item(i).id,
                    name: n.rows.item(i).name,
                    ctime: newDate.toLocaleString(),
                    num: n.rows.item(i).num,
                    note: n.rows.item(i).note,
                  };
                  d.push(r)
                }
              }
            }), d
        },
        somedata: function(i) {
          d = [];
          return n.execute(db, "SELECT * FROM item_data where name=(?) and  isDel=0 order by ctime asc", [i]).then(function(n) {
              var i, r
              if (n.rows.length > 0) {
                for (i = 0; i < n.rows.length; i++) {
                  var newDate = new Date();
                  newDate.setTime(n.rows.item(i).ctime);
                  r = {
                    id: n.rows.item(i).id,
                    name: n.rows.item(i).name,
                    ctime: newDate.toLocaleString(),
                    num: n.rows.item(i).num,
                    note: n.rows.item(i).note,
                  };
                  d.push(r)
                }
              }
            }), d
        },
        removedata: function(i, index) {
          n.execute(db, "DELETE FROM item_data WHERE id = (?)", [i]).then(function() {
            d.splice(index, 1);
          })
        },

      }
    }]);
