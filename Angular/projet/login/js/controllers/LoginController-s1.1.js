angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'auth', '$window','$q'];

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
    };

    $scope.localAuthAsk= function(){
    	/*Bout de code inutile, j'ai d'abord essayé de faire loginSuccess->admin/watch (pas réussi)
    	var login = $scope.user.login;
    	var pwd = $scope.user.pwd;
    	$scope.checkUser;*/

		var promise = auth.authAsk(login, pwd);
		promise.then(function (role) {
			$window.location.href = './' + role + '.html';
		});
	}

}