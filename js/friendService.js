angular.module('devMtIn')
.service('friendService', function($http) {

  var baseUrl = 'http://connections.devmounta.in/';

  this.findFriends = function(userId, query) {
    return $http({
      method: 'GET',
      url: baseUrl + 'api/friends/' + userId + '?name=' + query
    }).then(function(response) {
      return response.data;
    })
  };

  this.addFriend = function(userId, friendId) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/friends/' + userId,
      data: {friendId: friendId}
    })
  };

});
