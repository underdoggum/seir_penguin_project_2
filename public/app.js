//////////////////////////////////////////
// Interfacing with Youtube API v3
// Most of the code in the section below written with the help of the YouTube API docs for searching video lists
// https://developers.google.com/youtube/v3/docs/search/list


//////////////////////////////////////////
function loadClient() {

  gapi.client.setApiKey($("iframe").attr("class"));
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded before calling this method.
function execute(id) {
  return gapi.client.youtube.search.list({
    "part": [
      "snippet"
    ],
    "maxResults": 1,
    "q": id,
    "type": [
      "video"
    ],
    "videoCategoryId": "17",
    "videoDuration": "short"
  })
    .then(function(response) {
      const link = response.result.items[0].id.videoId;
      // use code "window.location.href = ..." if just redirecting
      const url = "https://www.youtube.com/embed/" + link;

      $("#youtube-modal").attr("src", url);
      $("#modal").show();
      $("#close").on("click", () => {
        $("#youtube-modal").attr("src", url);
        $("#modal").css("display", "none");
      });
    },
    function(err) { console.error("Execute error", err); });
}
gapi.load("client");


//////////////////////////////////////////
// jQuery video button
//////////////////////////////////////////
// load the client once this script has finished loading
$.getScript("https://apis.google.com/js/api.js", () => {
  loadClient();
});

// jQuery to grab button and pass the id into Youtube API as a query
$(".button-howto").on("click", function() {

  execute("how to perform " + this.id);

});
