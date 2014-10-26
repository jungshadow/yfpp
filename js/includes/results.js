(function(window, amplify, $) {

var content = $("#main-content");

content.on('click', '.toggle-button', function(event) {
    event.preventDefault();
    $(this).toggleClass("closed open").next('.toggle-container').slideToggle();
});

content.on('click', '.toggle-button, .toggle-container', function(event) {
    event.stopPropagation();
});

})(window, window.amplify, jQuery);