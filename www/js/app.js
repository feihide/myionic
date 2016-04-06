// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db;
angular.module('starter', ['ionic', 'starter.controllers', 'my.services', 'my.directives', 'ionic-material', 'ionMdInput', "ngCordova", 'chart.js', 'ionic-datepicker'])

  .run(function($ionicPlatform, Push, $rootScope, $cordovaSQLite) {
    // push notification callback
    var notificationCallback = function(data) {
      console.log('received data :' + data);
      var notification = angular.fromJson(data);
      //app 是否处于正在运行状态
      var isActive = notification.notification;

      // here add your code

      //ios
      if (ionic.Platform.isIOS()) {
        window.alert(notification);

      } else {
        //非 ios(android)a
      }
    };
    function initdb() {
      db = window.cordova ? $cordovaSQLite.openDB("project.db") : window.openDatabase("project.db", "1.0", "IonicMaterialDesignDB", -1);
      //$cordovaSQLite.execute(db, "ALTER TABLE item_data ADD COLUMN ctime integer");
      //   $cordovaSQLite.execute(db, "DROP TABLE item  ");
      //
      //   $cordovaSQLite.execute(db, "DROP TABLE item_data  ");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS item ( id  integer primary key   , name  text   ,   note    text  default ‘’ ,   createDate   dateTime  ,isDel  Boolean)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS item_data ( id  integer primary key   , name  text   ,   num  integer  , note text, ctime integer,  createDate   dateTime  ,isDel  Boolean)");
    }

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //初始化

      Push.init(notificationCallback);
      //设置别名
      Push.setAlias("12345678");

      initdb()
      if (window.cordova) {
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
          alert('连上啦');
        })
        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
          alert('掉线啦');
        })
      }
      if (window.cordova && window.cordova.plugins.device) {
        alert('device ok');
      }

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

    });
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(1);
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://**']);
      /*
      // Turn off back button text
      $ionicConfigProvider.backButton.previousTitleText(false);
      */

    $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

      .state('app.activity', {
        url: '/activity',
        views: {
          'menuContent': {
            templateUrl: 'templates/activity.html',
            controller: 'ActivityCtrl'
          },
          'fabContent': {
            template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
            controller: function($timeout) {
              $timeout(function() {
                document.getElementById('fab-activity').classList.toggle('on');
              }, 200);
            }
          }
        }
      })
      .state('app.phone', {
        url: '/phone',
        views: {
          'menuContent': {
            templateUrl: 'templates/phone.html',
            controller: 'PhoneCtrl'
          },
          'fabContent': {
            template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin" ng-click="capture()"><i class="icon ion-camera" ></i></button>',
            controller: function($timeout, $scope, $cordovaCamera) {
              $timeout(function() {
                document.getElementById('fab-friends').classList.toggle('on');
              }, 900);
              document.addEventListener("deviceready", function() {
                var options = {
                  quality: 50,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: true,
                  encodingType: Camera.EncodingType.JPEG,
                  targetWidth: 100,
                  targetHeight: 100,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: false,
                  correctOrientation: true
                };

                $scope.capture = function() {

                  $cordovaCamera.getPicture(options).then(function(imageData) {
                    var image = document.getElementById('myImage');
                    image.src = "data:image/jpeg;base64," + imageData;
                  }, function(err) {
                    // error
                  });
                }
              }, false);
            }
          }
        }
      })
      .state('app.location', {
        url: '/location',
        views: {
          'menuContent': {
            templateUrl: 'templates/location.html',
            controller: 'LocationCtrl'
          },
          'fabContent': {
            template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin" ng-click="capture()"><i class="icon ion-ios-location" ></i></button>',
            controller: function($timeout, $scope) {
              $timeout(function() {
                document.getElementById('fab-friends').classList.toggle('on');
              }, 900);
              $scope.capture = function() {
                $scope.$emit('location', 'done');
              }

            }
          }
        }
      })
      .state('app.detail', {
        url: '/detail/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/detail.html',
            controller: 'DetailCtrl'
          },
          'fabContent': {
            template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
            controller: function($timeout) {
              $timeout(function() {
                document.getElementById('fab-friends').classList.toggle('on');
              }, 900);
            }
          }
        }
      })
      .state('app.data', {
        url: '/data',
        views: {
          'menuContent': {
            templateUrl: 'templates/data.html',
            controller: 'DataCtrl'
          },
        //   'fabContent': {
        //     template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin" ng-click="goedit()" ><i class="icon ion-plus"></i></button>',
        //     controller: function($timeout, $state, $scope) {
        //       $timeout(function() {
        //         document.getElementById('fab-friends').classList.toggle('on');
        //       }, 900);
        //       $scope.goedit = function() {
        //         $state.go('app.projectedit');
        //       }
        //     }
        //   }
        }
      })
      .state('app.trend', {
        url: '/trend',
        views: {
          'menuContent': {
            templateUrl: 'templates/trend.html',
            controller: 'TrendCtrl'
          },
        //   'fabContent': {
        //     template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin" ng-click="goedit()" ><i class="icon ion-plus"></i></button>',
        //     controller: function($timeout, $state, $scope) {
        //       $timeout(function() {
        //         document.getElementById('fab-friends').classList.toggle('on');
        //       }, 900);
        //       $scope.goedit = function() {
        //         $state.go('app.projectedit');
        //       }
        //     }
        //   }
        }
      })
      .state('app.project', {
        url: '/project',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/project.html',
            controller: 'ProjectCtrl'
          },
          'fabContent': {
            template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin" ng-click="goedit()" ><i class="icon ion-plus"></i></button>',
            controller: function($timeout, $state, $scope) {
              $timeout(function() {
                document.getElementById('fab-friends').classList.toggle('on');
              }, 900);
              $scope.goedit = function() {
                $state.go('app.projectedit');
              }
            }
          }
        }
      })
      .state('app.projectedit', {
        url: '/project/edit/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/edit.html',
            controller: 'EditCtrl'
          },
        //   'fabContent': {
        //     template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-ios-checkmark" ng-click="goedit()"></i></button>',
        //     controller: function($timeout) {
        //       $timeout(function() {
        //         document.getElementById('fab-profile').classList.toggle('on');
        //       }, 800);
        //     }
        //   }
        }
      })

      .state('app.friends', {
        url: '/friends',
        views: {
          'menuContent': {
            templateUrl: 'templates/friends.html',
            controller: 'FriendsCtrl'
          },
          'fabContent': {
            template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
            controller: function($timeout) {
              $timeout(function() {
                document.getElementById('fab-friends').classList.toggle('on');
              }, 900);
            }
          }
        }
      })

      .state('app.gallery', {
        url: '/gallery',
        views: {
          'menuContent': {
            templateUrl: 'templates/gallery.html',
            controller: 'GalleryCtrl'
          },
          'fabContent': {
            template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
            controller: function($timeout) {
              $timeout(function() {
                document.getElementById('fab-gallery').classList.toggle('on');
              }, 600);
            }
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          },
          'fabContent': {
            template: ''
          }
        }
      })

      .state('app.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
          },
          'fabContent': {
            // template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
            // controller: function($timeout) {
            //   /*$timeout(function () {
            //       document.getElementById('fab-profile').classList.toggle('on');
            //   }, 800);*/
            // }
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
  });
