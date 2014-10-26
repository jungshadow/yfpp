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

    content.on('click', '.candidate-homepage-link', function(event) {
        var data = {
            contest: $(this).parents('.contest').attr('data-contest'),
            candidate_name: $(this).attr('data-candidate')
        };
        amplify.publish("candidateClick", data);
    });

});

})(window, window.amplify, jQuery);
