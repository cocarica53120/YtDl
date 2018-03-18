angular.module('myApp', [])
  .controller('youTubeController', ['$scope' , function($scope) {
    console.log('in youTubeController');
    $scope.ytLink = "https://www.youtube.com/watch?v=Rter-Np-Td0";
    $scope.startDownload = function() {
      console.log(`Start Download ${$scope.ytLink}`);
       
    };
  }])
  .controller('nameController', ['$scope', '$http', '$location' , function($scope, $http, $location) {
		// Before, Launch	RestApi server (located in RestApi dir)
    console.log('in nameController');
    console.log('host is ', $location.host());
		try {
			$http.get(`http://${$location.host()}:8081/listUsers`).then(response => {
				console.log(`status=${response.status}`);
				console.log(`data=${JSON.stringify(response.data)}`);
				if (response.status === 200) {
					$scope.name = response.data.user1.name;
				}
			}, response => {
				console.log('http.get rejected due to ', response);
			});
		} catch (e) { 
			console.error(`catched error on $http.get due to ${e}`);
		} finally {
    	$scope.name = "Toto";
		}

//		$http.get('http://localhost:8081/listUsers').success (function(data){
//				console.log('listUsers', data);
//		});
  }])
  .controller('loginController', ['$scope', '$rootScope', function($scope, $rootScope) {
    console.log('in loginController');
    console.log($rootScope);
    $scope.name = "Titi";
    $scope.password = "12345";
    $scope.persons = [
      { firstname: "Toto", lastname: "TRUC", email: "ot@example.com" },
      { firstname: "Titi", lastname: "TRUC", email: "it@example.com" },
      { firstname: "Alfred", lastname: "HITCHCOCK", email: "ah@example.com" },
    ];
    console.log('persons', $scope.persons);
  }])

