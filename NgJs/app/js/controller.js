angular.module('myApp', [])
  .controller('youTubeController', ['$scope', '$http', '$location', '$interval', function($scope, $http, $location, $interval) {
    console.log('in youTubeController');
    $scope.ytLink = "https://www.youtube.com/watch?v=Rter-Np-Td0";
    $scope.status_download = 'Nothing';
    $scope.progress_download = 0;
    $scope.progress_bar = 0;

    $scope.startDownload = function() {
      const url = `http://${$location.host()}:8081/api/start_download`;
      const cmd = {link: $scope.ytLink};
      console.log(`Start Download ${$scope.ytLink} at ${url}, cmd=${cmd}`);
      $scope.progress_bar = {
        width: '0%'
      };

      $http.post(url, cmd).then(response => {
        console.log('start_download:', response);
      }, response => {
        console.log(response);
        alert(`Problem for downloading`);
      });
    };
    $scope.statusDownload = function() {
      const url = `http://${$location.host()}:8081/api/status_download`;
      console.log(`Status Download ${$scope.ytLink} at ${url}`);
      $http.get(url).then(response => {
        console.log('status_download:', response);
        $scope.status_download = JSON.stringify(response.data.status);
        if (response.data.status === 'in_progress' || $scope.progress_download !== 0) {
          $scope.progress_download = JSON.stringify(response.data.progress.percent);
          $scope.progress_bar = {
            width: response.data.progress.percent + '%'
          };
        };
        console.log('progress_download:', $scope.progress_download);
        console.log('progress_bar:', $scope.progress_bar);
      });
    };

    $interval(function () {
      $scope.statusDownload();
    }, 500);

  }])
  .controller('nameController', ['$scope', '$http', '$location' , function($scope, $http, $location) {
    // Before, Launch  RestApi server (located in RestApi dir)
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

//    $http.get('http://localhost:8081/listUsers').success (function(data){
//        console.log('listUsers', data);
//    });
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


