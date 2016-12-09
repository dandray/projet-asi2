angular.module('authService', []).service('auth',authFnc);
function authFnc() {
	var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';
	var fncContainer={
		checkUser: checkUser,
		userList: userList
	};
    function checkUser(userlogin,userpwd){
        return (userMap[userlogin]==userpwd);
    };
	function userList(){
			var userlist=[];
			var i=0;
			angular.forEach(userMap, function(key) {
				userlist[i]=key;
				i++;
			});
			return userlist;
	};
return fncContainer;
} 