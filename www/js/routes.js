angular.module('my.routes', [])

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/sku/sku-list.html',
            controller: 'SkuCtrl',
          }
        }
      })
      //常购列表
      .state('tab.oftenbuy', {
        url: '/oftenbuy',
        views: {
          'tab-home': {
            templateUrl: 'templates/sku/sku-often-buy.html',
            controller: 'OftenbuyCtrl',
          }
        }
      })
      //搜索列表
      .state('tab.search', {
        url: '/search',
        views: {
          'tab-home': {
            templateUrl: 'templates/sku/sku-search.html',
            controller: 'SkuSearchCtrl',
          }
        }
      })
      //购物车-列表
      .state('tab.cart', {
        url: '/cart',
        views: {
          'cart-list': {
            templateUrl: 'templates/order/cart-list.html',
            controller: 'CartCtrl',
          }
        }
      })
      //购物车-编辑
      .state('tab.cartedit', {
        url: '/cartedit',
        views: {
          'cart-list': {
            templateUrl: 'templates/order/cart-list-edit.html',
            controller: 'CartCtrl',
          }
        }
      })

      //订单 - 确认订单
      .state('orderconfirm', {
        url: '/confirm',
        templateUrl: 'templates/order/order-confirmation.html',
        controller: 'OrderConfrimCtrl'
      })

      //订单 - 订单详情
      .state('orderdetail', {
        url: '/orderdetail/:order_id',
        params: {
          order_id: 0
        },
        templateUrl: 'templates/order/order-details.html',
        controller: 'OrderDetailCtrl',
      })

      //我的订单
      .state('tab.userorder', {
        url: '/userorder',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-order.html',
            controller: 'UserorderCtrl'
          }
        }
      })
      /*用户详情*/
      .state('tab.userdetail', {
        url: '/userdetail',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-detail.html',
            controller: 'UserdetailCtrl'
          }
        }
      })
      //注册
      .state('tab.register', {
        url: '/register',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-register.html',
            controller: 'RegisterCtrl',
          }
        }
      })
      //修改密码
      .state('tab.changepwd', {
        url: '/changepwd',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-change-pwd.html',
            controller: 'UpdatepwdCtrl'
          }
        }
      })

      //店铺
      .state('tab.usershop', {
        url: '/usershop',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-store.html',
            controller: 'ShopCtrl'
          }
        }
      })
      //添加店铺
      .state('tab.addshop', {
        url: '/addshop',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-new-store.html',
            controller: 'AddshopCtrl'
          }
        }
      })

      //注册-验证码填写
      .state('tab.verification', {
        url: '/verification',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-register-verification.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      //注册-密码填写
      .state('tab.pwd', {
        url: '/pwd',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-register-pwd.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      //找回密码
      .state('tab.forgetpwd', {
        url: '/forgetpwd',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-forget-pwd.html',
            controller: 'ForgetpwdCtrl'
          }
        }
      })

      //用户中心
      .state('tab.center', {
        url: '/center',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-center.html',
            controller: 'CenterCtrl'
          }
        }

      })
      //用户登录
      .state('tab.login', {
        url: '/login',
        views: {
          'user-center': {
            templateUrl: 'templates/user/user-login.html',
            controller: 'LoginCtrl',
          // resolve: {
          //   //这个函数的值会被直接返回，因为它不是数据保证
          //   person: function(apis) {
          //     apis.test({}, function() {})
          //     return {
          //       name: "ok",
          //     }
          //   },
          // },
          }
        }
      })
      //嵌套demo
      .state('inbox', {
        url: '/inbox/:inboxId',
        template: '<div><h1>Welcome to your inbox</h1>\
                    <a ui-sref="inbox.priority">Show priority</a>\
                    <div ui-view></div>\
                    </div>',
        controller: function($scope, $stateParams) {
          $scope.inboxId = $stateParams.inboxId;
        }
      })
      .state('inbox.priority', {
        url: '/priority',
        template: '<h2>Your priority inbox</h2>'
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
