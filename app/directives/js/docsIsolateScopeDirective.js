'use strict';
var app = angular.module('docsIsolateScopeDirective',[]);
app.controller('Controller', ['$scope', function($scope){
	$scope.naomi = {
      name: 'Naomi',
      address: '1600 Amphitheatre'
    };
    $scope.igor = {
      name: 'Igor',
      address: '123 Somewhere'
    };
    $scope.myClickHandler = function() {
    	alert('button is on click!');
    };
}]);
app.directive('myCustomer', function() {
 	return {
 		restrict: 'E',
 		scope: {
 			customer: '=info',
 			title: '@',
 			click: '&onClick'
 		},
 		template: 'Customer Name: {{customer.name}}, Address: {{customer.address}}, title: {{title}},<button ng-click="click()">按钮1</button>'
 	};
});