angular.module('App')
.factory('Chats', function ($firebase, $firebaseArray, Rooms, FURL) {

    var selectedRoomId;

    var ref = new Firebase(FURL);
    var chats;

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.$remove(chat).then(function (ref) {
                ref.key() === chat.$id; // true item has been removed
            });
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        getSelectedRoomName: function () {
            var selectedRoom;
            if (selectedRoomId && selectedRoomId != null) {
                selectedRoom = Rooms.get(selectedRoomId);
                console.log("Selected Room: " + selectedRoom);
                if (selectedRoom)
                    return selectedRoom.name;
                else
                    return null;
            } else
                return null;
        },
        selectRoom: function (roomId) {
            console.log("selecting the room with id: " + roomId);
            selectedRoomId = roomId;
            if (!isNaN(roomId)) {
                chats = $firebaseArray(ref.child('rooms').child(selectedRoomId).child('chats'));
            }
        },
        send: function (from, message) {
            if(angular.isUndefined(from)){
                from = {
                    displayName: "Default"
                };
            }
            console.log("sending message from :" + from.displayName + " & message is " + message);
            if (from && message) {
                var chatMessage = {
                    from: from.displayName,
                    message: message,
                    createdAt: Firebase.ServerValue.TIMESTAMP
                };
                chats.$add(chatMessage).then(function (data) {
                    console.log("message added");
                });
            }
        }
    }
})

/**
 * Simple Service which returns Rooms collection as Array from Salesforce & binds to the Scope in Controller
 */
.factory('Rooms', function ($firebaseArray, FURL) {
    // Might use a resource here that returns a JSON array
    var ref = new Firebase(FURL);
    var rooms = $firebaseArray(ref.child('rooms'));
    console.log(rooms.toString());

    return {
        all: function () {
            return rooms;
        },
        get: function (roomId) {
            // Simple index lookup
            return rooms.$getRecord(roomId);
        }
    }
});