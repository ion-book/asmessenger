'Use Strict';
angular.module('App').controller('RoomsCtrl', function ($scope, Rooms, Chats, $state) {
    //console.log("Rooms Controller initialized");
    $scope.rooms = Rooms.all();
    console.log($scope.rooms);

    $scope.openChatRoom = function (roomId) {
        $state.go('chat', {
            roomId: roomId
        });
}
}
);
