angular.module('sampleApp').directive('businessCard', [ '$http', function($http){
  return {
    restrict: 'E',
    scope: { person: '=' },
    templateUrl: 'sampleApp/businessCard.html',
    link: function (scope) {

      // Hit a random API, just to try it.
      // http://docs.ckan.org/en/latest/api/index.html
      $http.get('http://demo.ckan.org/api/3/action/package_list');
      $http.get('http://demo.ckan.org/api/3/action/package_search?q=spending');

    }
  };
}]);