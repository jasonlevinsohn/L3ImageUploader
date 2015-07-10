angular.module('l3.services', [])

.factory('Slideshow', function($q, $http) {

    var getMonthList = function() {
        var monthListP = $q.defer();
            
        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET'
        };

        // $http.get('http://localhost:8000/api/monthlist/')
        // $http({
        //     // headers: headers,
        //     method: 'JSONP',
        //     url: 'http://www.llamasontheloosefarm.com/api/monthlist/'
        // })
        $http.get('http://llamasontheloosefarm.com/api/monthlist/')
        // $http.get('http://192.168.43.76:8000/api/monthlist/')
        // $http.get('http://10.253.30.219:8000/api/monthlist/')
        // $http.get('http://192.168.1.136:8000/api/monthlist/')
        .then(function(success) {
            var monthList = [];
                
            _.each(success.data, function(data) {
                monthList.push(data.fields);

            });
            console.log('The Month List: ');
            console.log(monthList);
            monthListP.resolve(monthList);


        }, function(reject) {
            monthListP.reject(reject);
        });

        return monthListP.promise;

    };

    return {
        getMonthList: getMonthList
    };

})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
