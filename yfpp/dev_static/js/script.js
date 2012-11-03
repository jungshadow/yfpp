$(".toggle-button").click(function (e) {
		e.preventDefault();
        $(this).toggleClass("closed open").next('.toggle-container').slideToggle();

    });

    $('.toggle-button, .toggle-container').click(function (e) {
        e.stopPropagation();
    });
    $(document).click(function () {
           $(".toggle-container").slideUp('slow', function () {
            // Animation complete.
            
        });

    });
