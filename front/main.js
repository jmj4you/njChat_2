/**********************************
 *          Client JS file
 ********************************** */

var socket = io();

var $userList = $('#user-list');
var $messageList = $('#message-list');
$(function () {
    var $userForm = $('#user_form');
    var $chatForm = $('#chat_form');


    /** ADD USER */
    $userForm.submit(function () {
        socket.emit('add_user', $(this).find(':text').val());
        return false;
    });
    socket.on('user_joined', function (data) {
        $('#online-users').html(data.userCount);
        addNewUser(data.username);
    });


    /** CHAT MESSAGE*/
    $chatForm.submit(function () {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });


    /** Response from server */
    socket.on('chat_callback', function (msg) {
        console.log(msg);
        $('#messages').append($('<li>').text(msg));
    });

});

function addNewUser(username) {
    alert(username);

    var tmpl = '  <li class="media">'
        + '<div class="media-body">'
        + '<div class="media">'
        + '<a class="pull-left" href="#">'
        + '<img class="media-object img-circle" style="max-height:40px;"    src="assets/img/user.png"/>'
        + '</a>'
        + '<div class="media-body">'
        + '<h5>' + username + '</h5>'
        + '<small class="text-muted">Active From 3 hours</small>'
        + '</div >'
        + '< / div >'
        + '< / div >'
        + '< / li >';
    $userList.append('<li>jmj</li>');
}

function addNewMessage(data) {// json
    var tmpl = '<li class="media">'
        + '<div class="media-body">'
        + '<div class="media">'
        + '<a class="pull-left" href="#">'
        + '<img class="media-object img-circle " src="assets/img/user.png"/>'
        + '</a>'
        + '<div class="media-body">' + data.message + '  <br />'
        + '<small class="text-muted">' + data.username + '| 23rd June at 5:00pm</small><hr/></div>'
        + '< / div >'
        + '< / div >'
        + '< / li > ';
    $messageLis.append(tmpl);
}