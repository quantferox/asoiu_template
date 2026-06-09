$(document).ready(function () {
    /************************* WOW.JS - BEGIN *************************/
    new WOW().init();
    /************************* WOW.JS - ENDED *************************/

    /************************* FANCYBOX.JS - BEGIN *************************/
    Fancybox.bind("[data-fancybox='laboratory']");
    Fancybox.bind("[data-fancybox='gallery']");
    Fancybox.bind("[data-fancybox='summer_school_about_us']");
    Fancybox.bind("[data-fancybox='news']");
    Fancybox.bind("[data-fancybox='accomodation_room']");
    /************************* FANCYBOX.JS - ENDED *************************/

    /************************* NAVBAR SEARCH & MENU BUTTONS - BEGIN *************************/
    var $searchButton = $("#navbar_search_btn");
    var $inputContainer = $("#navbar_search_input_container");
    var $closeInputContainerButton = $("#navbar_search_close_btn");
    var $menuBurgerButton = $("#navbar_burger_btn");
    var $navbarMenu = $("#navbar_menu");
    var $navbarNavigation = $(".navbar__navigation");
    var $navbarMenuCloseButton = $("#navbar_menu_close_btn");
    var $logo = $(".navbar__logo");
    var $navbarSearch = $(".navbar__search");

    let initialLogoWidth = $logo.outerWidth();
    let initialLogoHeight = $logo.outerHeight();
    let initialLogoMargin = $logo.css("margin-left");

    function updateInitialLogoDimensions() {
        if ($logo.is(":visible")) {
            initialLogoWidth = $logo.outerWidth();
            initialLogoHeight = $logo.outerHeight();
            initialLogoMargin = $logo.css("margin-left");
        }
    }

    $(window).on("resize", function () {
        updateInitialLogoDimensions();
    });

    if ($searchButton.length) {
        $searchButton.on("click", function () {
            updateInitialLogoDimensions();

            $logo.css({
                width: "0px",
                height: "0px",
                marginLeft: "0px",
            });

            $navbarSearch.css({
                width: "100%",
            });

            $inputContainer.css({
                width: "100%",
            });

            if ($(window).width() >= 575) {
                $navbarNavigation.css({
                    maxWidth: "512px",
                });

                $logo.css({
                    width: initialLogoWidth,
                    height: initialLogoHeight,
                    marginLeft: initialLogoMargin,
                });
            }

            $navbarNavigation.css({
                width: "100%",
            });

            $searchButton.css({
                width: "0px",
            });
        });
    }

    if ($closeInputContainerButton.length) {
        $closeInputContainerButton.on("click", function () {
            $logo.css({
                width: initialLogoWidth + "px",
                height: initialLogoHeight + "px",
                marginLeft: initialLogoMargin,
            });

            $navbarNavigation.css({
                width: "0%",
            });

            $inputContainer.css({
                width: "0px",
            });

            $searchButton.css({
                width: "90px",
            });
        });
    }

    if ($menuBurgerButton.length) {
        $menuBurgerButton.on("click", function () {
            $navbarMenu.stop(true, true).fadeIn(300, function () {
                $navbarMenu.css("display", "flex");
            });
            $("body").css("overflow", "hidden");
        });
    }

    if ($menuBurgerButton.length) {
        $navbarMenuCloseButton.on("click", function () {
            $navbarMenu.stop(true, true).fadeOut(300, function () {
                $navbarMenu.css("display", "none");
            });
            $("body").css("overflow", "auto");
        });
    }
    /************************* NAVBAR SEARCH & MENU BUTTONS - ENDED *************************/

    /************************* NAVBAR MENU LOGICS - BEGIN *************************/
    $(".menu__link.active, .menu__dropdown-link.active").each(function () {
        var $this = $(this);
        var targetId = $this.data("dropdown-observed");
        var $dropdown = $("#" + targetId);

        if ($dropdown.length) {
            $dropdown.show();
        }

        $this.parents(".menu__dropdown").show();
    });

    function hideAllDropdowns() {
        $(".menu__dropdown").hide();
        $(".menu__dropdown-list ul").hide();
        $(".menu a").removeClass("active");
    }

    function hideAllNestedDropdowns($parent) {
        $parent.find("a[data-dropdown-observed]").each(function () {
            var $this = $(this);
            var targetId = $this.data("dropdown-observed");
            var $dropdown = $("#" + targetId);

            if ($dropdown.length) {
                $dropdown.hide();
                $this.removeClass("active");
                hideAllNestedDropdowns($dropdown);
            }
        });
    }

    $("#menu").on("click", "a[data-dropdown-observed]", function (event) {
        event.preventDefault();
        var $this = $(this);
        var targetId = $this.data("dropdown-observed");
        var $dropdown = $("#" + targetId);

        if ($dropdown.is(":visible")) {
            hideAllDropdowns();
        } else {
            hideAllDropdowns();
            $dropdown.show();
            $this.addClass("active");
        }
    });

    $(".menu").on("click", ".menu__dropdown-link[data-dropdown-observed]", function (event) {
        event.preventDefault();
        var $this = $(this);
        var targetId = $this.data("dropdown-observed");
        var $dropdown = $("#" + targetId);

        if ($dropdown.is(":visible")) {
            hideAllNestedDropdowns($dropdown);
            $dropdown.hide();
            $this.removeClass("active");
        } else {
            hideAllNestedDropdowns($this.closest(".menu__dropdown"));
            $dropdown.show();
            $this.addClass("active");
        }
    });

    $(".menu-mobile__dropdown-list").hide();

    $(".menu-mobile__link.active").each(function () {
        var $submenu = $(this).next(".menu-mobile__dropdown-list");

        if ($submenu.length) {
            $submenu.show();
        }

        $(this).parents(".menu-mobile__dropdown-list").show();
    });

    $(".menu-mobile__item > a").on("click", function (e) {
        e.preventDefault();

        var $submenu = $(this).next(".menu-mobile__dropdown-list");
        var $icon = $(this).find("i");
        var $currentLink = $(this);

        if (!$(this).parents(".menu-mobile__dropdown-list").length) {
            $(".menu-mobile__dropdown-list").not($submenu).slideUp(160);
            $(".menu-mobile__link > i").not($icon).css("transform", "rotate(0deg)");
            $(".menu-mobile__link").removeClass("active");
        }

        if ($submenu.length) {
            if ($submenu.is(":visible")) {
                $submenu.find(".menu-mobile__dropdown-list").slideUp(160);
                $submenu.find(".menu-mobile__link").removeClass("active");
            }

            $submenu.slideToggle(160);
            $currentLink.toggleClass("active");

            if ($icon.css("transform") === "none" || $icon.css("transform") === "matrix(1, 0, 0, 1, 0, 0)") {
                $icon.css({
                    "transform": "rotate(-180deg)",
                    "transition": "transform 0.3s ease"
                });
            } else {
                $icon.css({
                    "transform": "rotate(0deg)",
                    "transition": "transform 0.3s ease"
                });
            }
        }
    });
    /************************* NAVBAR MENU LOGICS - ENDED *************************/

    /************************* OWL-CAROUSEL INITIALIZATION - BEGIN *************************/
    $("#latest_news_carousel").owlCarousel({
        loop: true,
        margin: 32,
        nav: true,
        dots: false,
        items: 3,
        navText: [
            "<i class='ri-arrow-left-s-line'></i>",
            "<i class='ri-arrow-right-s-line'></i>",
        ],
        autoplay: true,
        autoplayTimeout: 3072,
        autoplayHoverPause: true,
        smartSpeed: 1024,
        responsive: {
            1200: {
                items: 3
            },
            992: {
                items: 2
            },
            768: {
                items: 2
            },
            576: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });

    $("#partners_owl_carousel").owlCarousel({
        loop: true,
        margin: 32,
        nav: false,
        dots: false,
        items: 7,
        autoplay: true,
        autoplayTimeout: 2048,
        autoplayHoverPause: true,
        smartSpeed: 1024,
        responsive: {
            1200: {
                items: 7
            },
            992: {
                items: 5
            },
            768: {
                items: 3
            },
            576: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    $("#about-carousel").owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3072,
        autoplayHoverPause: true,
        smartSpeed: 1024,
        responsive: {
            1200: {
                items: 5
            },
            992: {
                items: 4
            },
            768: {
                items: 3
            },
            576: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    $("#projects_owl_carousel").owlCarousel({
        loop: true,
        margin: 32,
        nav: false,
        dots: false,
        items: 5,
        rtl: true,
        autoplay: true,
        autoplayTimeout: 2048,
        autoplayHoverPause: true,
        smartSpeed: 1024,
        responsive: {
            1200: {
                items: 5
            },
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            576: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });
    /************************* OWL-CAROUSEL INITIALIZATION - ENDED *************************/

    /************************* FAQ DROPDOWN - BEGIN *************************/
    $(".faq__list").each(function () {
        var $faqList = $(this);
        $(".tab-content>.tab-pane").css("display", "block");
        $faqList.find(".faq__item.active .faq__answer").each(function () {
            $(this).css("max-height", $(this).prop("scrollHeight") + "px");
        });
        $(".tab-content>.tab-pane").css("display", "");
        $faqList.find(".faq__question").on("click", function () {
            var parentItem = $(this).parent();
            var answer = parentItem.find(".faq__answer");

            if (parentItem.hasClass("active")) {
                answer.css("max-height", "0px");
                parentItem.removeClass("active");
            } else {
                $faqList.find(".faq__item.active").each(function () {
                    var otherAnswer = $(this).find(".faq__answer");
                    otherAnswer.css("max-height", "0px");
                    $(this).removeClass("active");
                });

                answer.css("max-height", answer.prop("scrollHeight") + "px");
                parentItem.addClass("active");
            }
        });
    });
    /************************* FAQ DROPDOWN - ENDED *************************/

    /************************* ASSEMBLY HALL - BEGIN *************************/
    const rows = parseInt($("#reservation_table").data("rows-count"));
    const cols = parseInt($("#reservation_table").data("column-count"));
    const filledData = $("#reservation_table").data("filled");

    const filledCells = filledData ? filledData.split(",") : [];

    const tbody = $("<tbody></tbody>");
    $("#reservation_table").append(tbody);

    for (let i = 1; i <= rows; i++) {
        let row = "<tr>";
        for (let j = 1; j <= cols; j++) {
            const cellId = `${i}-${j}`;
            const isFilled = filledCells.includes(cellId);
            const cellClass = isFilled ? "filled" : "empty";
            const cellContent = isFilled ? "<div class='reservation__filled-cell'><i class='ri-close-large-fill'></i></div>" : j;

            row += `<td class="${cellClass}" data-rows="${i}" data-columns="${j}" data-fill="${cellClass}" data-cell="${cellId}">${cellContent}</td>`;
        }
        row += `<td class="row-number">${i}</td>`;
        row += "</tr>";
        tbody.append(row);
    }

    $("#reservation_table").addClass(filledCells.length > 0 ? "filled" : "empty");

    $("#reservation_table").on("click", "td:not(.row-number)", function () {
        if ($(this).hasClass("filled")) {
            return;
        }

        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $("#reservation_selected_cell").val("");
        } else {
            $("#reservation_table td.selected").removeClass("selected");
            $(this).addClass("selected");
            let row = $(this).data("rows");
            let col = $(this).data("columns");
            $("#reservation_selected_cell").val(`${row}-${col}`);
        }
    });
    /************************* ASSEMBLY HALL - ENDED *************************/

    /************************* PASSWORD TOGGLE - BEGIN *************************/
    $("button[data-password-toggle]").on("click", function () {
        const targetId = $(this).data("password-toggle");
        const passwordField = $(targetId);
        const type = passwordField.attr("type") === "password" ? "text" : "password";
        passwordField.attr("type", type);
        $(this).find("i").toggleClass("ri-eye-fill ri-eye-off-fill");
    });
    /************************* PASSWORD TOGGLE - ENDED *************************/

    /************************* TEACHERS MODAL - BEGIN *************************/
    $(".teacher__social-link[data-modal]").on("click", function (event) {
        event.preventDefault();

        var modalId = $(this).data("modal");
        $("#" + modalId).css("display", "grid");
        $("body").css("overflow", "hidden");
    });

    $(".teacher__modal").on("click", function (event) {
        if ($(event.target).is(".teacher__modal, .teacher__modal-close, .teacher__modal-close *")) {
            $(this).css("display", "none");
            $("body").css("overflow", "");
        }
    });
    /************************* TEACHERS MODAL - ENDED *************************/

    /************************* UPLOAD BUTTON - BEGIN *************************/
    $(".file-upload-button").click(function () {
        $("#have_a_suggestion_file").click();
    });
    /************************* UPLOAD MODAL - ENDED *************************/

    /************************* QUICK TRANSITION DROPDOWN MENU - BEGIN *************************/
    $(".register-quick-transition__btn").click(function () {
        $(this).closest(".register-quick-transition__container").find(".register_info").slideToggle(160);
        var icon = $(this).find("i");
        if (icon.css("transform") === "none") {
            icon.css("transform", "rotate(90deg)");
        } else {
            icon.css("transform", "none");
        }
    });
    /************************* QUICK TRANSITION DROPDOWN MENU - ENDED *************************/
});