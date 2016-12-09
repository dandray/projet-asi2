angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'auth'];

function loginCrtFnt($scope, $log){
	$scope.logAuth = function() {
		$log.info('user login', $scope.user.login);
		$log.info('user pwd', $scope.user.pwd);
	};
	$scope.logAuthObject = function(user) {
		$log.info('user login', $scope.user.login);
		$log.info('user pwd', $scope.user.pwd);
	};

	$scope.userList = function () {
	angular.forEach(auth.userList(),function(value) {
		$log.info(value);
		})
	};
}