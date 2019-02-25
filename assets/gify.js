var buttonsPool = ["cats", "dogs", "rabbits", "tigers", "monkeys", "animals"];

renderButtons(); 

function renderButtons() {

    $("#button-wrapper").empty();

    for (var j = 0; j < buttonsPool.length; j++) {

        var newButton = $("<button>"); 
        newButton.addClass("gif-btn");
        newButton.attr("data-name", buttonsPool[j]);
        newButton.text(buttonsPool[j]);

        $("#button-wrapper").append(newButton)
    }
}

$("#add-gif").on("click", function (event) {

    event.preventDefault();
    var newGif = $("#gif-input").val().trim().toLowerCase(); 
    buttonsPool.push(newGif); 
    renderButtons();

});

$(document).on("click", ".gif-btn", showGifResults);

function showGifResults() {

    var APIKey = "pJhVg5IgRa68h59of8TeEpsaz0Zii7N2";
    var searchParameters = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "q=" + searchParameters + "&api_key=" + APIKey + "&limit=10"

    $("#sub-wrapper").empty(); 

    $.ajax({ 
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {

            var imgURL = response.data[i].images.original_still.url;

            var gifOuter = $("<div>");
            gifOuter.attr("id", "GIF" + i);
            gifOuter.addClass("gif-holder-outer");
            $("#sub-wrapper").append(gifOuter);

            var renderGif = $("<img>");

            renderGif.attr("src", imgURL);
            renderGif.addClass("gif-holder");

            renderGif.attr("data-name", response.data[i].id); 
            renderGif.attr("data-clicked", "not-clicked"); 
            renderGif.attr("data-internal", [i]); 

            $("#sub-wrapper").append(renderGif);
            $("#GIF" + i).append('<div class="ratings">' + response.data[i].rating + '</div>');
        }

        $(document).on("click", ".gif-holder", function (event) {

            event.preventDefault();


            var internalID = $(this).attr("data-internal") 
            var newImgURL = response.data[internalID].images.original.url


            if ($(this).attr('data-clicked') == 'not-clicked') {

                $(this).attr("src", newImgURL);
                $(this).attr("data-clicked", "clicked");  
                

            } else if ($(this).attr('data-clicked') == 'clicked') {

                newImgURL = response.data[internalID].images.original_still.url
                console.log(newImgURL);

                $(this).attr("src", newImgURL);
                $(this).attr("data-clicked", "not-clicked");
            }
        });
    });


}