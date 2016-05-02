'use strict';
var app = angular.module('docsDraggableDirective', []);
app.directive('myDraggable', ['$document', function($document) {
	return function(scope, element, attr) {
		// x + startX = event.pageX
		// y + startY = event.pageY
		// startX为每次按下鼠标时，鼠标的X轴相对于色块的起始位置
		// x为移动过程中色块横轴的相对位置
		var x = 0, y = 0, startX = 0, startY = 0;

		element.css({
			position: 'relative',
			border: '1px solid red',
			backgroundColor: 'lightgrey',
			cursor: 'pointer'
		});

		element.on('mousedown', function(event) {
			event.preventDefault();
			startX = event.pageX - x;
			startY = event.pageY - y;
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
			console.log('startX:' + startX);
			console.log('startY:' + startY);
			// console.log('event.pageX:' + event.pageX);
			// console.log('event.pageY:' + event.pageY);
		});

		function mousemove(event) {
			x = event.pageX - startX;
			y = event.pageY - startY;
			// 这里不清楚为什么相对位置需要使用当前鼠标的坐标减去起始位置
			// 直接是当前鼠标的坐标不就好了？
			// 这里设置的相对位置是当前的鼠标位置同时减去起始时相对于色块的起始位置
			// 这样可以保证，无论鼠标起始是在色块的哪个位置，移动后鼠标和色块的相对位置仍不变
			// 如果修改为top: event.pageY,left: event.pageX时，每次当mousemove时，色块和鼠标相对位置都会重新定位为0,0
			element.css({
				top: y + 'px',
				left: x + 'px'
			});
		}

		function mouseup() {
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}
	};
}]);