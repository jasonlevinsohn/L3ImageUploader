angular.module('l3.controllers', ['ngCordova'])

.controller('DashCtrl', function($log, $ionicPlatform, $cordovaImagePicker,
  $cordovaFileTransfer) {
  var self = this,
      currentPicturesList = [];


  var init = function() {

    // Scoped Variables
    self.uploading = false;

    // Scoped Functions
    self.getPictures = getPictures;
    self.uploadPictures = uploadPictures;

  };


  $log.log('Dash Controller is loaded');

  var getPictures = function() {
    var options;

    options = {
      maximumImageCount: 10,
      width: 800,
      height: 800,
      quality: 50
    };

    $ionicPlatform.ready(function() {
      $cordovaImagePicker.getPictures(options)
        .then(function(results) {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ', results[i]);
          }

          currentPicturesList = results;

        });

    });

  };

  // Upload each picture one at a time.  After each picture is
  // uploaded recursively call this function until all the images
  // are out of the currentPicturesList and all the files have been uploaded.
  var uploadPictures = function() {
    var currentImage,
        fileName,
        options = {};


    if (currentPicturesList.length > 0) {

      currentImage = currentPicturesList.shift();
      console.log("Current Image being uploaded: " + currentImage);
      fileName = currentImage.split('/').pop();
      console.log("Image file name: " + fileName);

      options = {
        fileKey: 'farmFile',
        fileName: fileName,
        chunkedMode: false,
        mimeType: 'image/jpg',
        params: {
          'myName': 'this is the files name'
        }
      };

      console.log('the options: ');
      console.log(JSON.stringify(options));

      $cordovaFileTransfer.upload(
        // "http://192.168.1.136:8000/api/uploadimage/",
        // "http://10.253.30.219:8000/api/uploadimage/",
        "http://192.168.43.76:8000/api/uploadimage/",
        currentImage,
        options)
        .then(function(success) {
          console.log('Success: ');
          console.log(JSON.stringify(success));
          uploadPictures();
        }, function(fail) {
          console.log('Epic fail:');
          console.dir(fail);
        });


    }
  };

  init();

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
