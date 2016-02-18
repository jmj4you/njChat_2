//var app = require('express')();
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3002;

app.use(express.static(__dirname + '/front'));


app.get('/home', function (req, res) {
    res.send('<h1>welcome to CHAT-2</h1>');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/front/index.html');
});

// User numbers
var userCount = 0;
io.on('connection', function (socket) {

    // user status
    var hasUser = false;

    socket.on('add_user', function (username) {
        if (hasUser) return;

        // Assign username
        socket.username = username;
        ++userCount;
        hasUser = true;
        //io.emit('login_callback', " Welcome " + username + ", start chat with friends..."); // use this at client side
        // echo globally (all clients) that a person has connected
        io.emit('user_joined', {
            username: socket.username,
            userCount: userCount
        });

    });
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });


    socket.on('chat_message', function (msg) {
        //console.log('message: ' + msg);
        io.emit('chat_callback', {
            user: socket.username,
            message: msg
        });
    });
});


http.listen(port, function () {
    console.log('listening on *:' + port);
});
