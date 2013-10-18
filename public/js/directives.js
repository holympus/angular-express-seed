'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', ['version',function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  
  
  directive('question',[function(){
    return {
      restrict: 'A',
      templateUrl: 'partials/common/question',
      scope:{
        // '='-twowaybind, '&'-function getter (oneway), '@'-returns string
        question:  "=question",  
      },
      
      controller: ['$scope',function($scope){
        $scope.answerDisplay = {
          count: $scope.question.answers.length,
          index: 0
        };
        $scope.nextAnswer = function(){
          $scope.answerDisplay.index = ($scope.answerDisplay.index + 1) % $scope.answerDisplay.count;
        };
        $scope.previousAnswer = function(){
          $scope.answerDisplay.index = ($scope.answerDisplay.index - 1)% $scope.answerDisplay.count;
        }
      }],
      
      link: function(scope, element, attrs){        
      },
    };
    
  }])
  

