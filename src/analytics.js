// Global Analytics Functions
/*global ga*/
// Make sure that we have a version of the ga() var locally
// From https://stackoverflow.com/questions/20914703/
window.ga =
    window.ga ||
    function() {
        (window.ga.q = window.ga.q || []).push(arguments);
    };

let analytics = {
    send_event: function(category, action, label, noninteraction) {
        var nI = 0;
        if (noninteraction === true) {
            nI = 1;
        }
        ga('send', 'event', category, action, label, {
            nonInteraction: nI,
        });
    },
    social_action: function(social_network, action, label) {
        ga('send', 'social', social_network, action, label);
        ga('send', 'event', social_network, action, label);
    },
    success: function(result) {
        this.send_event('Address', 'Lookup', result.normalizedInput.state);
    },
    failure: function(result) {
        var error = result && result.error && result.error.message;
        this.send_event('Address', 'Failure', error);
    },
};

export default analytics;
