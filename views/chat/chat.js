'Use Strict';
angular.module('App').controller('ChatCtrl', function ($scope, Chats, $state) {
    console.log("Chat Controller initialized");

    $scope.IM = {
        textMessage: ""
    };

    Chats.selectRoom($state.params.roomId);
    console.log($state.data);
    console.log($state.params.roomId);

    var roomName = Chats.getSelectedRoomName();

    // Fetching Chat Records only if a Room is Selected
    if (roomName) {
        $scope.roomName = " - " + roomName;
        $scope.chats = Chats.all();
    }

    $scope.sendMessage = function (msg) {
        console.log(msg);
        Chats.send($scope.displayName, msg);
        $scope.IM.textMessage = "";
    }

    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
}
);