'use strict';
var app = angular.module('docsTransclusionDirective',[]);
app.controller('Controller', ['$scope', function($scope){
	$scope.name = 'Tobisa';
}]);
app.directive('myDialog', function() {
 	return {
 		restrict: 'E',
 		scope: {},
 		transclude: true,
 		template: 'This is a a name outside ng-transclude:{{name}}<hr><div ng-transclude></div>',
 		link: function(scope, element){
 			scope.name = 'wangpei';
  		}
 	};
});