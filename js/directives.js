/**
 * Created by Shtav on 5/16/15.
 */


app = angular.module('myApp');

app.directive('movieTile',[function(){
  return {
    restrict: 'EA',
    scope: {
      sourceUrl: '='
    },
    link: function(scope, elem, attrs) {

    }
  }
}]);
app.directive('repeatReveal', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {

      elem.removeClass('unrevealed')
    }
  }
}]);