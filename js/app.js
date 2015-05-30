/**
 * Created by Shtav on 5/16/15.
 */



app = angular.module('myApp', ['ui.bootstrap']);

app.controller('MainCtrl', ['$scope', 'movieDataFactory', '$interval', '$modal', function($scope, movieDataFactory, $interval, $modal) {

  movieDataFactory.success(function(data) {
    $scope.movies = data;
  });

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
      },
      size: 'lg'
    });
    modalInstance.result.then( function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }
  $scope.openModal = openModal;

}]);

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, movie, $sce, $window) {

  $scope.movie = movie;
  $scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + movie.trailer_youtube_id + '?autoplay=1&html5=1');

  $scope.ok = function () { $modalInstance.close(); };

  $scope.cancel = function () { $modalInstance.dismiss('cancel'); };

  $scope.redirectTo = function(url){
    if (url !== '') {
      $window.open(url, '_blank');
    }
  };

});

