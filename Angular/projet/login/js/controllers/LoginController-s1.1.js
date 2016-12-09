angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'auth', '$window'];

function loginCrtFnt($scope, $log, auth, $window){
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

    $scope.checkUser = function(){
        if(auth.checkUser($scope.user.login,$scope.user.pwd)){
            $window.location.href = './loginSuccess.html';
        }else{
            $window.location.href = './loginFail.html';
        }
    }
}