/**********************************
 *          Client JS file
 ********************************** */

var socket = io();
var me;
$(function () {

    var $userForm = $('#user_form');
    var $chatForm = $('#chat_form');


    /** ADD USER */
    $userForm.submit(function () {
        $('#add-user-section').remove();
        me = $(this).find(':text').val();
        socket.emit('add_user', me);
        return false;
    });
    /** current users Listing */
    socket.on('current_users', function (data) {
        $('#online-users').html(data.userList.length);
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
    $('#user-list').html('');
    console.log(data);
    console.log(me);
    $.each(data.userList, function (index, username) {

        //var img_src = (me == data.me) ? 'assets/img/me.jpeg' : 'assets/img/user.png';
        var img_src = 'assets/img/user.png';

        var tmpl = '  <li class="media">'
            + '<div class="media-body">'
            + '<div class="media">'
            + '<a class="pull-left" href="#">'
            + '<img class="media-object img-circle" style="max-height:40px;"    src="' + img_src + '"/>'
            + '</a>'
            + '<div class="media-body">'
            + '<h5>' + username + '</h5>'
            + '<small class="text-muted">Active From 3 hours</small>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</li>';
        $('#user-list').append(tmpl).last().hide().fadeIn('slow');
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
    $('#message-list').hide().append(tmpl).fadeIn('slow');
}