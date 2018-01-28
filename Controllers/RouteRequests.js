// Main file to handle incoming requests and route to right path.
var https = require('https');
var fs = require('fs');
var url = require('url');

function HandleCSSAndJSRequest(Request, Response) {
  // Handle CSS requests
  if(!Request.url.toLowerCase().endsWith("css") && !Request.url.toLowerCase().endsWith("js")) {
    console.log("Not processing - " + Request.url);
    return Response.end();
  }
  else {
    console.log("Processing - " + Request.url);
    fs.readFile("." + Request.url, function(Err, Stream) {
      if(!Err) {
        var ContentType = "";
        if(Request.url.toLowerCase().endsWith("css")) ContentType = "text/css";
        else ContentType = "application/javascript";
        Response.statusCode = "200";
        Response.setHeader("Content-Type", ContentType);
        Response.write(Stream);
        Response.end();
      }
  });
  }
}
function HandleIncomingRequest(Request, Response) {
  return new Promise(function(resolve, reject) {
    console.log("Handling request - " + Request.url);
    // If main page then respond with root index.html
    if(Request.url == "/") {
        fs.readFile("./Views/Html/Index.html", function(Err, Stream) {
          if(!Err) {
            // Respond with stream
            Response.statusCode = "200";
            Response.write(Stream);
          }
          else {
            Response.statusCode = "404";
            // Respond with "page not found html"
          }
          Response.end();
        });
        return resolve(Response);
      }
    else {
      HandleCSSAndJSRequest(Request, Response)
      return resolve(Response);
    };
    //resolve(Response);
  });

}
module.exports = {
  "HandleIncomingRequest": HandleIncomingRequest
};
