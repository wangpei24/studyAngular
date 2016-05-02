'use strict';
var app = angular.module('docsTimeDirective2',[]);
app.controller('Controller', ['$scope' ,function($scope){
	// $scope.format = 'yyyy-MM-dd h:mm:ss a';
	$scope.format = 'M/d/yy h:mm:ss a';
}]);
app.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
	return {
		transclude: true,
		template: '<div ng-transclude></div>',
		scope: {
			// 使用隔离的作用域并双向绑定父作用域中的属性my-current-time中的数据format
			// 如果不进行绑定只使用隔离作用域
			format: '=myCurrentTime'
		},
		// template: '<br>hello world  format:{{format}}</div>',
		controller: function ($scope, $element, $attrs) {
			var format, timeoutId;
			function updateTime(ele) {
				ele.find('span').text('Current Time is:' + dateFilter(new Date(), format));
			}
			$scope.$watch($attrs.myCurrentTime, function(value) {
				// 当format格式发生变化，当前时间的格式就发生变化
				format = value;
				updateTime($element);
			});
			timeoutId = $interval(function(){
				updateTime($element);
			}, 1000);
			$element.on('$destroy', function(){
				$interval.cancle(timeoutId);
			});
			this.showConsole = function() {
				console.log($attrs);
				console.log($scope);
			};
		}
	};
}]);

app.directive('showConsole', function(){
	 return {
      require: '^myCurrentTime',
      restrict: 'E',
      transclude: true,
      scope: {
        // title: '@'
      },
      link: function(scope, element, attrs, myCurrentTimeCtrl) {
          element.on('click', function(){
          	myCurrentTimeCtrl.showConsole();
          });
      },
      template: '<div ng-transclude></div>'
    };
});