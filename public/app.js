// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<a data-id=" + data[i]._id + " href='"+ data[i].link + "'>" + data[i].title + "</a>" + "<br />" + "<button type='button' class='btn btn-primary' data-id='" + data[i]._id + "' id='makenote'>Make a Note</button>"+  "<hr />");
    }
  });
  
  // Whenever someone clicks button
  $(document).on("click", "#makenote", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button type='button' class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });


  // scrape for new articles

  $(document).on("click", "#newarticle", function(){

    $.ajax({
      method: "GET",
      url: "/scrape"

    }).then(function(data) {

      location.reload();
    })

  })


  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();

    // // If that API call succeeds, add the title and a delete button for the note to the page
    // // Add the title and delete button to the #results section
    // $("#notes").prepend("<p class='data-entry' data-id=" + data._id + "><button type='button' class='btn btn-primary' data-id=" +
    // data._id + ">" + data.title + "</button></p>");
    //  // Also, remove the values entered in the input and textarea for note entry
     $("#titleinput").val("");
     $("#bodyinput").val("");
  });
});

// // When the #clear-all button is pressed
// $("#clear-all").on("click", function() {
//   // Make an AJAX GET request to delete the notes from the db
//   $.ajax({
//     type: "GET",
//     dataType: "json",
//     url: "/clearall",
//     // On a successful call, clear the #results section
//     success: function(response) {
//       $("#results").empty();
//     }
//   });
// });


// // When user clicks the delete button for a note
// $(document).on("click", ".delete", function() {
//   // Save the p tag that encloses the button
//   var selected = $(this).parent();
//   // Make an AJAX GET request to delete the specific note
//   // this uses the data-id of the p-tag, which is linked to the specific note
//   $.ajax({
//     type: "GET",
//     url: "/delete/" + selected.attr("data-id"),

//     // On successful call
//     success: function(response) {
//       // Remove the p-tag from the DOM
//       selected.remove();
//       // Clear the note and title inputs
//       $("#note").val("");
//       $("#title").val("");
//       // Make sure the #action-button is submit (in case it's update)
//       $("#action-button").html("<button id='make-new'>Submit</button>");
//     }
//   });
// });

// // When user click's on note title, show the note, and allow for updates
// $(document).on("click", ".dataTitle", function() {
//   // Grab the element
//   var selected = $(this);
//   // Make an ajax call to find the note
//   // This uses the data-id of the p-tag, which is linked to the specific note
//   $.ajax({
//     type: "GET",
//     url: "/find/" + selected.attr("data-id"),
//     success: function(data) {
//       // Fill the inputs with the data that the ajax call collected
//       $("#note").val(data.note);
//       $("#title").val(data.title);
//       // Make the #action-button an update button, so user can
//       // Update the note s/he chooses
//       $("#action-button").html("<button id='updater' data-id='" + data._id + "'>Update</button>");
//     }
//   });
// });

// // When user click's update button, update the specific note
// $(document).on("click", "#updater", function() {
//   // Save the selected element
//   var selected = $(this);
//   // Make an AJAX POST request
//   // This uses the data-id of the update button,
//   // which is linked to the specific note title
//   // that the user clicked before
//   $.ajax({
//     type: "POST",
//     url: "/update/" + selected.attr("data-id"),
//     dataType: "json",
//     data: {
//       title: $("#title").val(),
//       note: $("#note").val()
//     },
//     // On successful call
//     success: function(data) {
//       // Clear the inputs
//       $("#note").val("");
//       $("#title").val("");
//       // Revert action button to submit
//       $("#action-button").html("<button id='make-new'>Submit</button>");
//       // Grab the results from the db again, to populate the DOM
//       getResults();
//     }
//   });
// });