angular.module('authService', []).service('auth',authFnc);
authFnc.$inject=['$http','$q'];
function authFnc($http,$q) {
	var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';

	var fncContainer={
		checkUser: checkUser,
		userList: userList,
        localAuthAsk:localAuthAsk,
        authAsk : authAsk
    };
    function checkUser(userlogin,userpwd){
        return (userMap[userlogin]==userpwd);
    }
    function userList(){
			var userlist=[];
			var i=0;
			angular.forEach(userMap, function(key) {
				userlist[i]=key;
				i++;
			});
			return userlist;
	}

    function localAuthAsk(login,pwd){
        var deferred = $q.defer();
        setInterval(function(login,pwd){
            if( userMap[login]==pwd){
                if (login == 'tp'){
                    deferred.resolve('admin');
                } else {
                    deferred.resolve('watch');
                }
            }else{
                deferred.reject('failed');
            }
            clearInterval(this);
        },3000,login,pwd);


        return deferred.promise;
    }

    function authAsk(login,pwd){
        var deferred = $q.defer();
        $http.post('/',{'login':login,'pwd':pwd}).
        success(function(data, status, headers, config) {
            if (login == 'tp'){
                deferred.resolve('admin');
            } else {
                deferred.resolve('watch');
            }
        }).
        error(function(data, status, headers, config) {
            deferred.reject('failed');
        });
        return deferred.promise;
    };
    return fncContainer;
} 