'use strict';
var app = angular.module('docsTimeDirective',[]);
app.controller('Controller', ['$scope' ,function($scope){
	// $scope.format = 'yyyy-MM-dd h:mm:ss a';
	$scope.format = 'M/d/yy h:mm:ss a';
}]);
app.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
	// 指令中的link函数当要修改DOM时使用
	function link(scope, ele, attr) {
		var format, timeoutId;
		function updateTime(ele) {
		// ele是一个类似jQuery的对象，有和jQuery一样的DOM操作方法
		// 错误1：ele.text = dateFilter(xx);
			ele.text(dateFilter(new Date(), format));
		}
		// 错误2：scope.$watch(ele.attr.myCurrentTime)
		scope.$watch(attr.myCurrentTime, function(value) {
			// 当format格式发生变化，当前时间的格式就发生变化
			format = value;
			updateTime(ele);
		});
		timeoutId = $interval(function(){
			updateTime(ele);
		}, 1000);
		// 错误3：所有的依赖注入的参数都是一个string类型，包括这里的事件名称
		ele.on('$destroy', function(){
			$interval.cancle(timeoutId);
		});
	}
	return {
		// scope: {
		// 	myCurrentTime: '=format'
		// },
		template: '<br>hello world',
		link: link
	};
}]);