angular.module('myApp', [])
  .controller('youTubeController', ['$scope' , function($scope) {
    console.log('in youTubeController');
    $scope.ytLink = "https://www.youtube.com/watch?v=Rter-Np-Td0";
    $scope.startDownload = function() {
      console.log(`Start Download ${$scope.ytLink}`);
       
    };
  }])
  .controller('nameController', ['$scope' , function($scope) {
    console.log('in nameController');
    $scope.name = "Alain";
  }])
  .controller('loginController', ['$scope', '$rootScope', function($scope, $rootScope) {
    console.log('in loginController');
    console.log($rootScope);
    $scope.name = "Titi";
    $scope.password = "12345";
    $scope.persons = [
      { firstname: "Alain", lastname: "COLLET", email: "ac@example.com" },
      { firstname: "Juju", lastname: "COLLET", email: "jc@example.com" },
      { firstname: "Alfred", lastname: "HITCHCOCK", email: "ah@example.com" },
    ];
    console.log('persons', $scope.persons);
  }])

