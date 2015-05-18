/**
 * Created by Shtav on 5/16/15.
 */


app = angular.module('myApp')
  .directive('trailerModal', function() {
  return {
    restrict: 'EA',

    controller: function($scope) {
      $scope.hey = 'hey'
    },
    link: function(scope, elem, attrs) {


    }
  }
})
  .directive('movieTile',[function(){
  return {
    restrict: 'CA',
    controller: 'trailerModal',
    scope: {
      sourceUrl: '='
    },
    link: function(scope, elem, attrs, trailerModalCtrl) {
      console.log(trailerModalCtrl.hey);
      elem.bind('click', function (event) {
        var trailerYouTubeId = $(this).attr('data-trailer-youtube-id');
        var sourceUrl = 'http://www.youtube.com/embed/' + scope.sourceUrl + '?autoplay=1&html5=1';
        $("#trailer-video-container").empty().append($("<iframe></iframe>", {
          'id': 'trailer-video',
          'type': 'text-html',
          'src': sourceUrl,
          'frameborder': 0
        }));

      });
    }
  }
}]);