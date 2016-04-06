angular.module('my.directives', [])
  .directive("appMap", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div id='allMap'></div>",
      scope: {
        center: "=", // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
        markers: "=", // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
        width: "@", // Map width in pixels.
        height: "@", // Map height in pixels.
        zoom: "@", // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
        zoomControl: "@", // Whether to show a zoom control on the map.
        scaleControl: "@", // Whether to show scale control on the map.
        address: "@",
        latitude: "@",
        longitude: "@"
      },
      link: function($scope, $element) {

        var map;
        // 百度地图API功能
        map = new BMap.Map("allMap");
        //map.enableScrollWheelZoom(true);
        // 创建地址解析器实例
        var task = function() {
          if ($scope.address) {
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint($scope.address, function(point) {
              if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
              }
            }, "");
          }
          if ($scope.longitude && $scope.latitude) {
            map.centerAndZoom(new BMap.Point($scope.longitude, $scope.latitude), 11); // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
          }
        };
        $scope.$watch(function() {
          return [$scope.latitude, $scope.address, $scope.longitude]
        }, function(newValue, oldValue) {
          //window.alert(newValue);
          task();
        }, true);

      }

    };
  });
