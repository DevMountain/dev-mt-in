angular.module('devMtIn')
.controller('homeCtrl', function($scope, profileService) {

  $scope.myProfile = profileService.checkForProfile();

  $scope.sortOptions = [{
    display: 'Ascending',
    value: false
    },
    {
    display: 'Descending',
    value: true
    }
  ];

  // profileService.serviceTest();

  $scope.editing = false;

  $scope.saveProfile = function(profile) {
    profileService.saveProfile(profile);
    $scope.editing = false;
  }

  $scope.deleteProfile = function(profile) {
    profileService.deleteProfile(profile);
    $scope.myProfile = profileService.checkForProfile();
    $scope.editing = false;
  }

});
