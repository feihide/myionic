/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
      navIcons.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }
    $scope.$on('location', function(d, data) {
      //   console.log(data); //子级得不到值
      $scope.$broadcast('clocation', 'ccc');
    });
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }
    };

    $scope.setExpanded = function(bool) {
      $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
      var hasHeaderFabLeft = false;
      var hasHeaderFabRight = false;

      switch (location) {
        case 'left':
          hasHeaderFabLeft = true;
          break;
        case 'right':
          hasHeaderFabRight = true;
          break;
      }

      $scope.hasHeaderFabLeft = hasHeaderFabLeft;
      $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (!content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }

    };

    $scope.hideHeader = function() {
      $scope.hideNavBar();
      $scope.noHeader();
    };

    $scope.showHeader = function() {
      $scope.showNavBar();
      $scope.hasHeader();
    };

    $scope.clearFabs = function() {
      var fabs = document.getElementsByClassName('button-fab');
      if (fabs.length && fabs.length > 1) {
        fabs[0].remove();
      }
    };
  })

  .controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
      $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
  })
  .controller('LocationCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $cordovaGeolocation, $ionicPlatform) {
    var output = document.getElementById("out");
    // var longitude = 121.506191;
    // var latitude = 31.245554;
    // $scope.mapOptions = {
    //   center: {
    //     longitude: longitude,
    //     latitude: latitude
    //   },
    //   zoom: 17,
    //   city: 'ShangHai',
    //   markers: [{
    //     longitude: longitude,
    //     latitude: latitude,
    //     //icon: 'img/mappiont.png',
    //     width: 49,
    //     height: 60,
    //     title: 'Where',
    //     content: 'Put description here'
    //   }]
    // };

    $scope.latitude = 39.915;
    $scope.longitude = 116.404;
    $scope.$on('clocation', function(d, data) {
      $scope.latitude = 29.9;
      $scope.longitude = 116.404;
      loc();
    });

    //$scope.address = "北京华威桥";
    // $scope.longitude = 116.404;
    // $scope.latitude = 39.915;
    var loc = function() {
      output.innerHTML = '<p>Latitude is ' + $scope.latitude + '° <br>Longitude is ' + $scope.longitude + '°</p>';

    //   baidu_location.getCurrentPosition(function(position) {
    //     position = eval('(' + position + ')');
    //     //window.alert(position);
    //     $scope.latitude = position.latitude;
    //     $scope.longitude = position.longitude;
    //     output.innerHTML = '<p>Latitude is ' + $scope.latitude + '° <br>Longitude is ' + $scope.longitude + '°</p>';
    //   }, function() {
    //     window.alert('定位失败')
    //   });
    }


    $ionicPlatform.ready(function() {
      loc();

      //   var posOptions = {
      //     timeout: 10000,
      //     enableHighAccuracy: false
      //   };
      //   navigator.geolocation
      //     .getCurrentPosition(function(position) {
      //       var lat = position.coords.latitude
      //       var long = position.coords.longitude
      //       $scope.msg = "lat:" + lat + ' long:' + long;
      //       console.log(ok);
      //
      //     }, function(err) {
      //       console.log(err);
      //
      //     // error
      //     });


      //   var watchOptions = {
      //     timeout: 3000,
      //     enableHighAccuracy: false // may cause errors if true
      //   };
      //
      //   var watch = $cordovaGeolocation.watchPosition(watchOptions);
      //   watch.then(
      //     null,
      //     function(err) {
      //       // error
      //     },
      //     function(position) {
      //       var lat = position.coords.latitude
      //       var long = position.coords.longitude
      //       $scope.msg = "lat:" + lat + ' long:' + long;
      //       console.log('ff');
      //     });

    })
    // watch.clearWatch();
    // // OR
    // $cordovaGeolocation.clearWatch(watch)
    //   .then(function(result) {
    //     // success
    //   }, function(error) {
    //     // error
    //   });

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
      $scope.isExpanded = true;
      $scope.$parent.setExpanded(true);
    }, 300);

    // Set Ink
    ionicMaterialInk.displayEffect();

  })
  .controller('ProjectCtrl', function($scope, sqlite, $filter, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, $ionicPopup) {
    $scope.items = [];
    $scope.items = sqlite.allitem();
    $scope.show = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    };
    $scope.hide = function() {
      $ionicLoading.hide();
    };
    $scope.show();
    $timeout(function() {
      // Set Motion
      if ($scope.items.length)
        ionicMaterialMotion.fadeSlideInRight();
      $scope.hide();
    //console.log($scope.items);
    }, 3e3)
    $scope.delete = function(index) {
      var confirmPopup = $ionicPopup.confirm({
        title: '系统提示',
        template: '是否确定删除这条记录?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          sqlite.removeitem($scope.items[index].id, index);
        } else {
          console.log('You are not sure');
        }
      });
    }
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    // Delay expansion
    $timeout(function() {
      $scope.isExpanded = true;
      $scope.$parent.setExpanded(true);
    }, 300);
    // Set Ink
    ionicMaterialInk.displayEffect();

  })
  .controller('TrendCtrl', function($scope, $stateParams, $timeout, sqlite, $filter, ionicMaterialMotion, ionicMaterialInk, $state, $ionicPopup) {

    // $scope.onClick = function(points, evt) {
    //   console.log(points, evt);
    // };

    $scope.project = sqlite.allitem();
    $scope.labels = [];
    $scope.data = [[]];
    var getData = function(n) {
      // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      // $scope.data = [[
      //   28, 48, 40, 19, 86, 27, 90
      // ]];
      n = $scope.project[n].name;
      $scope.items = sqlite.somedata(n);
      $timeout(function() {

        angular.forEach($scope.items, function(value) {
          $scope.labels.push(value.ctime.substr(0, 10));
          $scope.data[0].push(value.num);
        });
      //   ionicMaterialMotion.fadeSlideInRight();
      }, 300)
    }



    var state = 0;

    $scope.changes = function(i) {
      state = i;
      getData(state);

    }
    $scope.delete = function(index) {
      var confirmPopup = $ionicPopup.confirm({
        title: '系统提示',
        template: '是否确定删除这条记录?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          sqlite.removedata($scope.items[index].id, index);
        } else {
          console.log('You are not sure');
        }
      });
    }

    // $scope.items = sqlite.somedata();
    $timeout(function() {
      getData(state);
    //   ionicMaterialMotion.fadeSlideInRight();
    }, 300)
  })
  .controller('EditCtrl', function($scope, $stateParams, $timeout, sqlite, $filter, ionicMaterialMotion, ionicMaterialInk, $state) {
    $scope.item = {
      name: '',
      note: ''
    };
    $scope.title = '新增';

    if ($stateParams.id) {
      $scope.title = '编辑';
      sqlite.getitem($stateParams.id, function(t) {
        $scope.item.name = t.name;
        $scope.item.note = t.note;
      })
    }
    $scope.save = function() {
      if ($scope.item.name) {
        //更新
        if ($stateParams.id) {
          sqlite.updateitem({
            id: $stateParams.id,
            name: $scope.item.name,
            note: $scope.item.note,
          });
        } else {
          //插入
          sqlite.additem({
            name: $scope.item.name,
            note: $scope.item.note,
            createDate: $filter("date")(new Date, "MMM dd yyyy"),
          });
        }
        $state.go('app.project', {}, {
          reload: true
        })
      } else {
        alert('名称不能为空');
      }
    }
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);


  })

  .controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
      $scope.isExpanded = true;
      $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
  })

  .controller('PhoneCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $cordovaCamera, $ionicPlatform) {
    $ionicPlatform.ready(function() {
      $scope.evt = function() {
        var options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
        };

        $cordovaCamera.getPicture(options).then(function(imageURI) {
          var image = document.getElementById('myImage');
          image.src = imageURI;
        }, function(err) {
          // error
        });
      }
    })

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
      $scope.isExpanded = true;
      $scope.$parent.setExpanded(true);
    }, 300);

    // Set Ink
    ionicMaterialInk.displayEffect();
  })
  .controller('DetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, apis) {

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    apis.get_one({
      id: $stateParams['id']
    },
      function(data) {
        $scope.url = data[2];
      }
    )

    // Delay expansion
    $timeout(function() {
      $scope.isExpanded = true;
      $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
  })

  .controller('DataCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $filter, sqlite, $ionicLoading, $ionicPopup) {
    $scope.nowdate = $filter("date")(new Date, "yyyy-MM-dd"),

    $scope.items = [];
    var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var datePickerCallback = function(val) {
      if (typeof (val) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.datepickerObject.inputDate = val;
        $scope.nowdate = $filter("date")(val, "yyyy-MM-dd");
        getData($scope.nowdate);
      }
    };
    $scope.datepickerObject = {
      titleLabel: '选择日期', //Optional
      todayLabel: '今天', //Optional
      closeLabel: '关闭', //Optional
      setLabel: '确认', //Optional
      setButtonType: 'button-assertive', //Optional
      todayButtonType: 'button-assertive', //Optional
      closeButtonType: 'button-assertive', //Optional
      inputDate: new Date(), //Optional
      mondayFirst: true, //Optional
      //   disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
      monthList: monthList, //Optional
      templateType: 'modal', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2028, 8, 25), //Optional
      callback: function(val) { //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'yyyy-MM-dd', //Optional
      closeOnSelect: false, //Optional
    };
    $scope.show = function(c) {
      $ionicLoading.show({
        template: c
      });
    };
    $scope.hide = function() {
      $ionicLoading.hide();
    };


    var getData = function(n) {
      $scope.show('加载中。。。');
      $timeout(function() {
        // Set Motion
        $scope.items = sqlite.alldata($scope.nowdate);
      //console.log($scope.items);
      }, 100);
      $timeout(function() {
        // Set Motion
        if ($scope.items.length) {
          ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
          });
        }
        $scope.hide();
      //console.log($scope.items);
      }, 500)
    }
    getData($scope.nowDate);


    $scope.delete = function(index) {
      var confirmPopup = $ionicPopup.confirm({
        title: '系统提示',
        template: '是否确定删除这条记录?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          sqlite.removedata($scope.items[index].id, index);
        } else {
          console.log('You are not sure');
        }
      });
    }
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);


    // Set Ink
    ionicMaterialInk.displayEffect();
  })

  .controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $filter, sqlite, $ionicLoading) {
    $scope.nowdate = $filter("date")(new Date, "yyyy-MM-dd"),
    $scope.show = function(c) {
      $ionicLoading.show({
        template: c
      });
    };
    $scope.hide = function() {
      $ionicLoading.hide();
    };
    $scope.show('加载中。。。');
    $timeout(function() {
      // Set Motion
      $scope.items = sqlite.allitem();
    //console.log($scope.items);
    }, 100)

    $timeout(function() {
      // Set Motion
      if ($scope.items.length) {
        ionicMaterialMotion.fadeSlideInRight();
      }
      $scope.hide();

    //   $scope.hide();
    //console.log($scope.items);
    }, 300)

    $scope.newdata = function(i) {
      //   val = angular.element('#in_' + i).val();

      $scope.show('保存中。。。');
      var number = parseInt($scope.items[i]['num']);
      if (angular.isNumber(number) && number > 0) {
        sqlite.adddata({
          name: $scope.items[i]['name'],
          num: number,
          note: $scope.items[i]['note'],
          ctime: new Date().getTime(),
          'createDate': $scope.nowdate
        }, function() {
          $scope.show('保存完毕');
          $timeout(function() {
            $scope.hide();
          }, 500);
          $scope.items[i]['num'] = '';
        });

      } else {
        alert('请输入数字');
      }
    }

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    // Set Ink
    ionicMaterialInk.displayEffect();
  })

  .controller('ActivityCtrl', function($scope, $stateParams, $timeout, $state, ionicMaterialMotion, ionicMaterialInk, apis, $ionicPopup, $ionicLoading) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.goDetail = function(message) {
      $state.go("app.detail", {
        "id": message
      });
    };
    var vm = $scope.vm = {
      moredata: false,
      messages: [],
      pagination: {
        perPage: 10,
        currentPage: 0
      },
      init: function() {
        apis.get_fetch({
          limit: vm.pagination.perPage,
          offset: vm.pagination.currentPage
        }, function(data) {
          $scope.items = data;
          vm.pagination.currentPage += 1;
          $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
              selector: '.animate-fade-slide-in .item'
            });
          }, 200);
        })

      },
      show: function(message) {
        if (message.static) {
          message.static = false;
        } else {
          message.static = true;
        }
      },
      doRefresh: function() {
        vm.pagination.currentPage = 0;
        $timeout(function() {
          apis.get_fetch({
            limit: vm.pagination.perPage,
            offset: vm.pagination.currentPage
          }, function(data) {
            $scope.items = data;
            vm.pagination.currentPage += 1;
            $timeout(function() {
              ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
              });
            }, 200);
          })
          $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
      },
      loadMore: function() {
        vm.pagination.currentPage += 1;
        apis.get_fetch({
          limit: vm.pagination.perPage,
          offset: vm.pagination.currentPage * vm.pagination.perPage
        }, function(data) {
          //alert(data.length);
          if (data.length == 0) {
            vm.moredata = true;
          } else {
            $scope.items = $scope.items.concat(data);
            vm.pagination.currentPage += 1;
            $timeout(function() {
              ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
              });
            }, 200);
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }
    }
    vm.init();

    $scope.getLocalTime = function(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
    $scope.formatStr = function(str) {
      str = str.replace('"', "");
      return str;
    }

    $scope.del = function(id) {
      $scope['hide' + id] = true;
      apis.del_fetch({
        id: id
      }, function(data) {
        if (data == 'error') {
          data = '报错';
        } else {
          data = '删除成功';
        }
        $ionicLoading.show({
          template: data,
          duration: 1000
        });
      })
    }

    $scope.favor = function(id) {
      apis.favor_fetch({
        id: id
      }, function(data) {
        if (data == 'error') {
          data = '报错';
        } else {
          document.getElementById('favor' + id).innerHTML = parseInt(document.getElementById('favor' + id).innerHTML) + 1
          data = '收藏成功';
        }
        $ionicPopup.alert({
          title: '响应',
          template: data
        });
      })
    }


    // Activate ink for controller
    ionicMaterialInk.displayEffect();


  })

  .controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
      selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
      selector: '.animate-fade-slide-in .item'
    });

  })

;
