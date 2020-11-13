var Chat = require("./modules/user/controllers/userController");

//globalized beacause will be used frequently and out of any scope;
// global.Users={};
global.keys = {};
global.sockets = {};

//socket initialized in app.ja
module.exports = {
    start: function (io) {
        io.on("connection", function (socket) {

            if (socket.handshake.query.userEmail) {
                let userEmail = socket.handshake.query.userEmail;
                global.keys[socket.id] = userEmail;
                pushSockets(userEmail, socket.id, global.sockets);
            }
            //event handler for new user
            socket.on("new-user", userEmail => {
                global.keys[socket.id] = userEmail;
                pushSockets(userEmail, socket.id, global.sockets);
            });
            // adding new message to conversation event handler
            socket.on("add-message", messageObj => {
                Chat.messageStore(messageObj, function (err, response) {
                    if (err) throw err;
                    sendToUser(messageObj.to, io, "message", {
                        type: "new-message",
                        from: messageObj.from,
                        text: messageObj.message
                    });
                });
            });

            //User disconnected event handler
            socket.on("disconnect", function () {
                userEmail = keys[socket.id];
                deleteSocket(userEmail, socket.id);
                delete global.keys[socket.id];
            });

            global.io = io;
        });
    }
};

/**********************************
 * Local Functions                 *
 **********************************/

function sendToUser(userEmail, io, event, data) {
    let sockets = global.sockets[userEmail];
    if (sockets) {
        sockets.forEach(sid => {
            io.to(sid).emit(event, data);
        });
    }
}
//push in sockets
function pushSockets(userEmail, socket_id, sockets) {
    if (sockets[userEmail]) {
        sockets[userEmail].push(socket_id);
    } else {
        sockets[userEmail] = [socket_id];
    }
}

function deleteSocket(userEmail, socket_id) {
    let sockets = global.sockets[userEmail];
    if (sockets) {
        if (sockets.length == 1) {
            delete global.sockets[userEmail];
        } else {
            var index = sockets.indexOf(socket_id);
            if (index > -1) {
                sockets.splice(index, 1);
            }
        }
    }
}

