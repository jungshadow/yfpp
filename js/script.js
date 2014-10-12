// @codekit-prepend: "vendor/handlebars-v2.0.0.min.js"
// @codekit-prepend: "vendor/amplify-v1.1.2.min.js"
// @codekit-append: "includes/process_request.js"
// @codekit-append: "includes/analytics.js"
// @codekit-append: "includes/social.js"
// @codekit-append: "includes/navigation.js"
// @codekit-append: "includes/display.js"
// @codekit-append: "includes/init_site.js"
// @codekit-append: "includes/results.js"

if (!window.console) {
    // Allow us to use console.log() without breaking everything in old IE
    // From https://stackoverflow.com/questions/8002116/
    var noOp = function(){}; // no-op function
    window.console = {
        log: noOp,
        warn: noOp,
        error: noOp
    };
}

window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
};

window.ga = window.ga || function () {
    (window.ga.q = window.ga.q || []).push(arguments);
};