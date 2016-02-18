/**********************************
 *          Client JS file
 ********************************** */

var socket = io();

$(function () {

    var $userForm = $('#user_form');
    var $chatForm = $('#chat_form');

    /** current users Listing */
    socket.emit('current_users', 1);
    socket.on('current_users', function (data) {
        console.log(data);
        $('#online-users').html(data.userList.length);
        addNewUser(data);
    });


    /** ADD USER */
    $userForm.submit(function () {
        socket.emit('add_user', $(this).find(':text').val());
        return false;
    });
    socket.on('user_joined', function (data) {
        $('#online-users').html(data.userList.length);
        $('#add-user-section').remove();
        addNewUser(data);
    });


    /** CHAT MESSAGE*/
    $chatForm.submit(function () {
        socket.emit('chat_message', $(this).find(':text').val());
        $(this).find(':text').val('');
        return false;
    });

    /** Response from server */
    socket.on('chat_callback', function (data) {
        addNewMessage(data);
    });

});

function addNewUser(data) {
    $.each(data.userList, function (index, username) {

        var tmpl = '  <li class="media">'
            + '<div class="media-body">'
            + '<div class="media">'
            + '<a class="pull-left" href="#">'
            + '<img class="media-object img-circle" style="max-height:40px;"    src="assets/img/user.png"/>'
            + '</a>'
            + '<div class="media-body">'
            + '<h5>' + username + '</h5>'
            + '<small class="text-muted">Active From 3 hours</small>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</li>';
        $('#user-list').append(tmpl);
    });
}

function addNewMessage(data) {// json
    var tmpl = '<li class="media">'
        + '<div class="media-body">'
        + '<div class="media">'
        + '<a class="pull-left" href="#">'
        + '<img class="media-object img-circle " src="assets/img/user.png"/>'
        + '</a>'
        + '<div class="media-body">' + data.message + '<br/>'
        + '<small class="text-muted">' + data.username + '| 23rd June at 5:00pm</small><hr/></div>'
        + '</div>'
        + '</div>'
        + '</li> ';
    $('#message-list').append(tmpl);
}