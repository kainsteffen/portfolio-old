window.addEventListener
    (
    'load',
    function (event) {

        $(".project img").css({ width: "" + $("project").height() + "px" });

        setup();
        fillParallaxDots();

        $("#hideAll").fadeOut(500);

        $("footer").html("© " + (new Date()).getFullYear() + " Khanh Steffen");
    }
    );

window.addEventListener('resize',
    function (event) {
        adaptCSS()
        fillParallaxDots();
    });



$(window).scroll
    (
    function () {
        revealOnScroll();

        if ($(this).scrollTop() == 0) {
            clearPageLinks();
            hideHeader();
        }
        else {
            showHeader();
        }

        if ($(this).scrollTop() >= $('#workSeparator').position().top - $("header").outerHeight(true)) {
            clearPageLinks();
            $('#workLink').addClass("active");
        }

        if ($(this).scrollTop() >= $('#aboutSeparator').position().top - $("header").outerHeight(true)) {
            clearPageLinks();
            $('#aboutLink').addClass("active");
        }

        if ($(this).scrollTop() >= $('#contactSeparator').position().top - $("header").outerHeight(true)) {
            clearPageLinks();
            $('#contactLink').addClass("active");
        }
    }
    );

function revealOnScroll() {
    var scrolled = $(window).scrollTop(),
        win_height_padded = $(window).height() * 1.1;

    // Animation is showing...
    $(".separatorLine, .project, #contact, #interests, #about, .contactForm").each
        (
        function () {
            // Add the animated class to trigger the animation
            if (scrolled + win_height_padded > $(this).offset().top) {
                $(this).addClass('animate');
            }
            else if (scrolled + win_height_padded + 100 < $(this).offset().top) {
                $(this).removeClass('animate');
            }
        }
        );
}

function clearPageLinks() {
    $('#aboutLink').removeClass("active");
    $('#contactLink').removeClass("active");
    $('#workLink').removeClass("active");
}

function setup() {
    adaptCSS();

    $(".navbarToggle").click(function () {
        $(".navbarToggle").toggleClass("collapsed");

        if ($('.navbarToggle').hasClass('collapsed')) {
            $(".altNavbar").slideDown(500);
            $(".altNavbar ul li").toggleClass("hidden");
        }
        else {
            $(".altNavbar").slideUp(500);
            $(".altNavbar ul li").toggleClass("hidden");
        }
    });

    $(".pageLink").click
        (
        function (event) {
            event.preventDefault();
            var target = $(this).attr("href");

            $(this).addClass("active");

            $('html,body').animate
                (
                {
                    scrollTop: $(target).offset().top - $("header").outerHeight(true)
                }, 'slow'
                );
        }
        );

    $("#workSeparator").click(scrollToWork);
    $("#aboutSeparator").click(scrollToAbout);
    $("#contactSeparator").click(scrollToContact);

    $(".topButton").click(scrollToTop);
}

function adaptCSS() {
    $("#parallax").css("height", $(window).height() - $("#workSeparator").outerHeight(true) + "px");

    var entryMargin = $("#parallax").height() * 0.5 - $("#entry").height() * 0.5;

    $("#entry").css("padding-top", entryMargin + "px");
    $("#entryBracket").css("padding-top", entryMargin + "px");

    $("header").css({ "display": "none" });
    $(".topButton").css({ "display": "none" });
    $(".altNavbar").css({ "height": $(window).height() + "px" });

}

function fillParallaxDots() {

    var parallaxContainer = $("#parallax").get(0);
    var parallaxInstance = new Parallax(parallaxContainer);

    var layer1 = $("#dots1").get(0);
    var layer2 = $("#dots2").get(0);
    var layer3 = $("#dots3").get(0);

    removeChildren(layer1);
    removeChildren(layer2);
    removeChildren(layer3);

    var dotSize = 10;
    var dotSpacing = 3;

    var dotMargin = ($("#dots1").width() * (dotSpacing / 100)) * 2;
    var dotFullSize = dotSize + dotMargin;
    var dotRowCount = Math.floor($("#parallax").height() / dotFullSize);
    var dotColumnCount = Math.floor($("#parallax").width() / dotFullSize);
    var dotCount = dotRowCount * dotColumnCount;

    generateDots(layer1, dotCount, dotSize, dotSpacing);
    generateDots(layer2, dotCount, dotSize, dotSpacing);
    generateDots(layer3, dotCount, dotSize, dotSpacing);
}

function generateDots(container, dotCount, dotSize, dotSpacing) {
    container.style.width = "100%";

    for (i = 0; i < dotCount; i++) {
        var newDiv = document.createElement("div");

        newDiv.style.display = "inline-block";
        newDiv.style.margin = dotSpacing + "%";
        newDiv.style.background = "white";
        newDiv.style.borderRadius = "50%";
        newDiv.style.width = dotSize + "px";
        newDiv.style.height = dotSize + "px";

        container.appendChild(newDiv);
    }
}

function scrollToTop() {
    scrollToElement($("main"), 500);
}

function scrollToWork() {
    scrollToElement($("#workSeparator"), 500);
}

function scrollToAbout() {
    scrollToElement($("#aboutSeparator"), 500);
}

function scrollToContact() {
    scrollToElement($("#contactSeparator"), 500);
}

function showHeader() {
    $('.arrowDown').fadeOut(500, );

    $("header").slideDown();
    $(".topButton").slideDown();
}

function hideHeader() {

    $(".arrowDown").fadeIn(500);
    $("#workSeparator .separatorLine.animate").removeClass("animate");
    $("header").slideUp();
    $(".topButton").slideUp();
}

function scrollToElement(jQueryObj, time) {
    $('html, body').animate
        (
        {
            scrollTop: jQueryObj.offset().top - $("header").outerHeight(true)
        }, time
        );
}

function removeChildren(object) {
    while (object.firstChild) {
        object.removeChild(object.firstChild);
    }
}
