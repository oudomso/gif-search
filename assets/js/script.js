
    var topic=['dog','cat','bird'];

    $("#add-gif").on("click", function(event) {
      event.preventDefault();

        var gif = $("#gif-input").val().trim();
        $("#gif-input").val("");
        if(gif!=""){
          topic.push(gif);
          console.log(gif);
          displaygif(gif);
          renderButtons();
        }
      
    });

    function renderButtons() {

      $("#buttons-view").empty();

      for (var i = 0; i < topic.length; i++) {
        var a = $("<button>");
        a.addClass("gifbtn btn btn-secondary");
        a.attr("data-name", topic[i]);
        a.attr("type", "button");
        a.text(topic[i]);
        $("#buttons-view").append(a);
      }
    }

    renderButtons();
    function displaygif(gif){
        // Grabbing and storing the data-animal property value from the button
        //var gif = $(this).attr("data-name");
        
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=wD26TG3fyEOmSPWd6KyRYyAHXYQGsUQ9&limit=5";
        
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET",
        })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);
        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;
          var row = $("<div class=row></div>")
          for (var i = 0; i < results.length; i++) {
            var col = $("<div class = col-3-md>")
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            p.addClass("rating");
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.addClass("gif");
            animalDiv.append(p);
            animalDiv.append(animalImage);
            col.append(animalDiv);
            row.append(col);
          }
          
          $("#gifs-appear-here").prepend(row);
        });
    }
    $("body").on("click", ".gif", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
    });
    $('body').on("click", ".gifbtn", function () {
      console.log($(this).attr("data-name"))
      var word = $(this).attr("data-name");
      displaygif(word);
    });