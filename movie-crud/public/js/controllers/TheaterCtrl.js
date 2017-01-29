angular.module('TheaterCtrl', []).controller('TheaterController', function($scope,$http) {

	$scope.tagline = 'Theater detals add here!';

	var refresh = function() {
        $http.get('/theater/getTheater').success(function(response) {
            console.log('READ THEATERS IS SUCCESSFUL');
            $scope.theaterList = response;
           // $scope.theater = "";
        });
    };
   
   refresh();

    $scope.addTheater = function(theater) {
             //console.log(response);
            var theaterObj = {
            	theaterName:$scope.theaterName,
            	city:$scope.city,
            	seats:$scope.seats
            };
           
            $http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/theater/addTheater',
                    headers: {'Content-Type': 'application/json'},    
                    data: theaterObj
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });


            // var serviceName = 'movi'
            // $http.post('/movie/addMovie', movieObj).success(function(response) {
            //     console.log(response);
            //     console.log("CREATE IS SUCCESSFUL");
            //     refresh();
            // });

        
           //console.log($scope.contact);
    };
 

    $scope.removeTheater = function(theater) {
        //console.log(id);
        $http.delete('/theater/deleteTheater/' + theater._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editTheater = function(theater) {
    	console.log(theater);
        $http.get('/theater/getTheater/' + theater._id).success(function(response) {
            $scope.theater = response[0];
        });
    };

    $scope.updateTheater = function() {
        console.log("REACHED UPDATE");
        console.log($scope.theater._id);
        $http.put('/theater/updateTheater/' + $scope.theater._id, $scope.theater).success(function(response) {
            console.log(response);
            refresh();
        })
    }
   
 });