/*jshint esversion: 6 */
$(document).ready(function() {
    if (!window.location.hash) {
        $.getJSON("json/home.json", function(data) {
            changeContent("home", data);
            history.replaceState(data, "", window.location.href);
        });
    } else {
        let hash = window.location.hash.replace(/#\//g, "");
        $.getJSON("json/" + hash + ".json", function(data) {
            changeContent(hash, data);
            history.replaceState(data, "", window.location.href);
        });
    }


    $("a[href]").click(function() {
        let href = $(this).attr("href");
        let hash = href.replace(/#\//g, "");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $.getJSON("json/" + hash + ".json", function(data) {
            let state = data;
            changeContent(hash, data);
            history.replaceState(state, hash, href);
        });
    });

    $(window).on("popstate", function(event) {
        let state = event.originalEvent.state;
        let url = (window.location.hash) ? window.location.hash.replace(/#\//g, "") : "home";
        if (state) {
            changeContent(url, state);
            $("a[href*=" + url + "]").siblings().removeClass("active");
            $("a[href*=" + url + "]").addClass("active");
        }
    });

    function changeContent(name, data) {
        $("#wrapper").empty();
        $("#" + name + "Tmpl").tmpl(data).appendTo("#wrapper");
        if (name == "galery") {
            makeGalery();
        }
        document.title = capitalizeFirstLetter(name);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function makeGalery() {
        $(".galery").magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: true
            }
        });
    }
});
