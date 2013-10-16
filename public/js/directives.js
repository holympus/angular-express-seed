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
      priorety: 0,
      templateUrl: 'partials/common/question', //expects this to be loaded on the page
      // compile: function(tEl, tAttrs, transclude){
      //     console.log('element',tElement);
      //     console.log('tAttrs',tAttrs);
      //     console.log('transclude', transclude);
      //     return{
      //       pre: function preLink(scope, el, attrs) {
      //         console.log('attrs', iAttrs);
      //       },
      //       post: function postLink(scope,el,attrs){
      //
      //       }
      //     };
      // },
      link: function(scope, element, attrs){
        console.log('scope',scope);
      },
      

    
    };
    
  }])
  
  
