
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

