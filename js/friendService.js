angular.module('devMtIn')
.service('friendService', function($http, $q) {

  var baseUrl = 'http://connections.devmounta.in/';

  this.findFriends = function(userId, query) {
    return $http({
      method: 'GET',
      url: baseUrl + 'api/friends/' + userId + '?name=' + query
      //  url: baseUrl + 'api/friends/?name=' + query
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

  this.removeFriend = function(userId, friendId) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/friends/remove/' + userId,
      data: {friendId: friendId}
    })
  };

  this.findFriendFriends = function(profile) {
    var index = 0;  // Create an index that we will use to track friends.
    var deferred = $q.defer(); // Create a promise and assign it to the variable deferred

    function getNextFriend() {  // Declare a closure function
      if (profile.friends[index]) {  // Check to see if there are friends remaining in array
        return $http({
          method: 'GET',
          url: baseUrl + 'api/friends-friends/' + profile.friends[index]._id
      }).then(function(friends) { //Taking in an array of friends returned from the server.
        profile.friends[index].friends = friends.data; // Update our friend with the recieved data.
        index++; // Increment our counter.
        getNextFriend(); // Recall the function to handle the next friend
      }).catch(function(err) { // Error Catching
        return console.error(err);
      });
      } else { // Once we have finished running through our friends array
        deferred.resolve(profile); // Resolve our promise with our updated profile
        return deferred.promise; // Return the promise
      }
    }
    getNextFriend(); // Invoke the inner function for the first time
    return deferred.promise;
  }

});
