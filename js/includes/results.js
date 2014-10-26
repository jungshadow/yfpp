(function(window, amplify, $) {

$(function() {
    var content = $("#main-content");

    content.on('click', '.toggle-button', function(event) {
        event.preventDefault();
        $(this).toggleClass("open").next('.toggle-container').slideToggle();
        amplify.publish("tryAgainToggle");
    });

    content.on('click', '.toggle-button, .toggle-container', function(event) {
        event.stopPropagation();
    });
});

})(window, window.amplify, jQuery);
