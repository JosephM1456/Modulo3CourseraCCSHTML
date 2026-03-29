(function (global) {
    var dc = {};

    var homeHtmlUrl = "snippets/home-snippet.html";
    var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };


    document.addEventListener("DOMContentLoaded", function (event) {
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML, true);
    });


    function chooseRandomCategory(categories) {
        var randomArrayIndex = Math.floor(Math.random() * categories.length);
        return categories[randomArrayIndex];
    }

    function buildAndShowHomeHTML(categories) {
        $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {


            var chosenCategory = chooseRandomCategory(categories);
            var chosenCategoryShortName = chosenCategory.short_name;

            var homeHtmlToInsert = insertProperty(homeHtml, "randomCategoryShortName", "'" + chosenCategoryShortName + "'");

            document.querySelector("#main-content").innerHTML = homeHtmlToInsert;
        }, false);
    }


    dc.loadMenuItems = function (categoryShort) {
        console.log("Cargando categoría: " + categoryShort);
        alert("¡Felicidades! Has cargado la categoría: " + categoryShort);
    };

    global.$dc = dc;
})(window);