angular.module('l3.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $log, $ionicPlatform, $cordovaImagePicker,
    $cordovaFileTransfer, $cordovaFile, Slideshow) {
    var self = this,
        currentPicturesList = [],
        currentFileSize;

        String.prototype.cap = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };

    var init = function() {

        // Scoped Variables
        self.uploading = false;
        self.uploadDisabled = true;
        self.filesToUpload = [];
        self.monthSelect = [];

        // Scoped Functions
        self.getPictures = getPictures;
        self.uploadPictures = uploadPictures;
        self.clearPictures = clearPictures;
        self.functionTest = functionTest;

        populateMonthDropdown();

        // TEST OBJECT
        // self.filesToUpload = [
        //     {
        //         'file': '/img/20140513_141052.jpg',
        //         'title': 'First Title',
        //         'desc': 'First Description'
        //     },
        //     {
        //         'file': '/img/20140513_141052.jpg',
        //         'title': 'second title',
        //         'desc': 'second desc'
        //     }
        // ];

    };

    var clearPictures = function() {
        self.filesToUpload = [];
    };

    var functionTest = function() {
        console.log('Selected Month: ', self.selectedMonth);
    };

    var populateMonthDropdown = function() {
        var projects = [],
            months = [];


        Slideshow.getMonthList().then(function(list) {

            _.each(list, function(l) {
                if (l.slideshow_id < 500) {
                    months.unshift(l);
                } else {
                    projects.push(l);
                }
            });

            _.each(projects, function(p) {
                months.push(p);
            });

            _.each(months, function(m) {
                if (m.slideshow_id < 500) {
                    m.displayMonth = m.month + ' ' + m.year;
                } else {
                    m.displayMonth = m.month;
                }

                // Capitalize the first letter
                m.displayMonth.cap();
            });

            console.log('Months: ', months[months.length - 1]);

            self.monthSelect = months;

        });


    };

    var processLocalFile = function(localFile) {

        var nativeURL = localFile.nativeURL;

        localFile.file(function(obj) {

            $scope.$apply(function() {
                self.filesToUpload.push({
                    name: obj.name,
                    file: nativeURL,
                    lastModified: obj.lastModifiedDate,
                    size: intScalar(obj.size)
                });
            });
        });
    };

    var fileProcessError = function(error) {
        $log.error('Error Processing Local File: ', error.code);
    };

    var getPictures = function() {
        var options;


        options = {
            maximumImageCount: 10,
            // width: 800,
            // height: 800,
            quality: 50
        };

        $ionicPlatform.ready(function() {
        $cordovaImagePicker.getPictures(options)
            .then(function(results) {
                self.uploadDisabled = false;

                for (var i = 0; i < results.length; i++) {

                    window.resolveLocalFileSystemURL(
                            results[i],
                            processLocalFile,
                            fileProcessError);

                }
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

        currentImage = self.filesToUpload.shift();
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

    // Takes a number(file Size) and pretty prints it.
    function intScalar(raw) {
    	formatted = "";
    	
    	if(raw > 999999) {
    		mod = (raw / 1000000).toFixed(2);
    		formatted = mod + "MB";
    	} else if(raw > 999) {
    		mod = (raw / 1000).toFixed(2);
    		formatted = mod + "KB";
    	} else {
    		formatted = raw.toString();
        }
    	
    	return formatted;
    }

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
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
