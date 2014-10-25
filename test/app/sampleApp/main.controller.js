
angular.module('sampleApp').controller('MainController', function($scope, $interval){


  // Sample Application Stuff, not part of the Watch Watcher
  $scope.rolodex = [
    {
      firstName: 'Gordon',
      lastName: 'Sumner',
      email: 'sting@thePolice.com',
      phone: 1238675309,
      address1: '123 Sesame St',
      postalCode: '12345'
    },
    {
      firstName: 'Frank',
      lastName: 'Zappa',
      email: 'franktank@spot.com',
      phone: 9887323423,
      address1: '123 Sesame St',
      postalCode: '25422'
    }
  ];

  $scope.user = {
    firstName: 'Your',
    lastName: 'Name'
  };

  $scope.saveCurrentUser = function () {
    $scope.rolodex.push( angular.copy($scope.user) );
    $scope.user = {}; // start fresh
    $scope.userForm.$setPristine();
    document.getElementsByTagName('input')[0].focus(); // start in a nice spot
  };

  $scope.addFake = function(){
    $scope.user = {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob@jones.com',
      phone: 1238675309,
      address1: '123 Sesame St',
      postalCode: Math.floor(Math.random() * 10000)
    }
    $scope.saveCurrentUser();
  }

});