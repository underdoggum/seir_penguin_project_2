
//////////////////////////////////////////
// Interfacing with Youtube API v3
//////////////////////////////////////////
function loadClient() {
  gapi.client.setApiKey("AIzaSyAgaEnauGZWMtlYvvbq4AyCGv7vsRHj0i8");
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
    "videoDuration": "short"
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log(response.result.items[0].id.videoId);
              window.location.href = "https://www.youtube.com/watch?v=" + response.result.items[0].id.videoId;

            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client");
//////////////////////////////////////////

// load the client once this script has finished loading
$.getScript("https://apis.google.com/js/api.js", () => {
  loadClient();
});

// jQuery to grab button and pass the id into Youtube API query for redirecting
$(".button-howto").on("click", function() {

  execute(this.id)

});
