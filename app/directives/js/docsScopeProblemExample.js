'use strict';
var app = angular.module('docsScopeProblemExample',[]);
app.controller('NaomiController', ['$scope', function($scope) {
    $scope.customer = {
      name: 'Naomi',
      address: '1600 Amphitheatre'
    };
}]);
app.controller('IgorController', ['$scope', function($scope) {
    $scope.customer = {
      name: 'Igor',
      address: '123 Somewhere'
    };
 }]);

app.directive('myCustomer', function() {
 	return {
 		restrict: 'E',
 		template: 'Your name is {{customer.name}}<br> Your address is {{customer.address}}'
 	};
});