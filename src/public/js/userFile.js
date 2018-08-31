$(function() {
    $getJSON('api', userFile);

    function update(data) {
        var output = '';
        $.each(data,function(key, item) {
            output += '<div class="userFile-item item-list media-list">';
            output += '<div class="userFile-item media">';
            output += '<div class="userFile-info media-body">';
            output += '<div class="userFile-title">' + item.title + '<small class="userFile-name label-info"></small></div>';
            output += '</div>';
            output += ' <div class-"userFile-message">' + item.message + '</div>';
            output += '</div>';
            output += '</div>';
            output += '</div>';

        });
        $('.userFile-messages').html(output);
    }
});