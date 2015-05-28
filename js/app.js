/**
 * Created by Shtav on 5/16/15.
 */



app = angular.module('myApp', ['ui.bootstrap']);

app.controller('MainCtrl', ['$scope', 'movieDataFactory', '$interval', '$modal', function($scope, movieDataFactory, $interval, $modal) {

  movieDataFactory.success(function(data) {
    $scope.movies = data;
  });

  console.log($scope.movies);

  $scope.moviesRevealed = -1;
  function revealMovie(){
    $scope.moviesRevealed++;
    if ($scope.moviesRevealed > $scope.movies.length) {
      $interval.cancel(revealMovieInterval);
    }
  }
  var revealMovieInterval = $interval(revealMovie, 300);


  function openModal(movie) {
    var modalInstance = $modal.open({
      templateUrl: 'templates/modal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        movie: function () {
          return movie;
        }
      }
    });
    modalInstance.result.then( function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }
  $scope.openModal = openModal;

}]);

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, movie) {

  $scope.movie = movie;


  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

