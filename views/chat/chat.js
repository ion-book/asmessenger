'Use Strict';
angular.module('App').controller('ChatCtrl', function ($scope, Chats, $state, $localStorage) {
    console.log("Chat Controller initialized");

    $scope.IM = {
        textMessage: ""
    };

    Chats.selectRoom($state.params.roomId);
    console.log($state.params.roomId);
    console.log($localStorage.email);

    var roomName = Chats.getSelectedRoomName();

    // Fetching Chat Records only if a Room is Selected
    if (roomName) {
        $scope.roomName = " - " + roomName;
        $scope.chats = Chats.all();
    }

    $scope.sendMessage = function (msg) {
        console.log(msg);
        from = {
                    displayName: $localStorage.email
                };
        Chats.send(from, msg);
        //Chats.send($scope.displayName, msg);
        $scope.IM.textMessage = "";
    }

    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
}
);