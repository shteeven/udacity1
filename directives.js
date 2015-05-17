/**
 * Created by Shtav on 5/16/15.
 */


app = angular.module('myApp');

app.directive('empty', [function() {
  return {
    link: function($scope, elem, attrs) {
      elem.on('onClick', function (event) {
        // Remove the src so the player itself gets removed, as this is the only
        // reliable way to ensure the video stops playing in IE
        $("#trailer-video-container").empty();
      });
    }
  }
}]);

app.directive('movieModal', [function() {
  return {
    restrict: 'EA',
    replace: false,
    scope: {
      movieModal: '='
    },
    link: function(scope, elem, attrs) {

      if (parseInt(scope.index)==0) {
        angular.element(attrs.options).css({'background-image':'url('+ scope.item.src +')'});
      }
      elem.bind('click', function (event) {
        var trailerYouTubeId = scope.movie.trailer_youtube_url;
        var sourceUrl = 'http://www.youtube.com/embed/' + trailerYouTubeId + '?autoplay=1&html5=1';
        $("#trailer-video-container").empty().append(
          $("<iframe></iframe>", {
            'id': 'trailer-video',
            'type': 'text-html',
            'src': sourceUrl,
            'frameborder': 0
          }))
      })
      }
    }
}]);

app.directive('modal', function () {
  return {
    template: '<div class="modal fade">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
    '<h4 class="modal-title">{{ title }}</h4>' +
    '</div>' +
    '<div class="modal-body" ng-transclude></div>' +
    '</div>' +
    '</div>' +
    '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value){
        if(value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});