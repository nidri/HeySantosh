// Main file to handle incoming requests and route to right path.
var https = require('https');
var fs = require('fs');
var url = require('url');

function HandleIncomingRequest(Request, Response) {
  return new Promise(function(resolve, reject) {
    console.log("Handling request - " + Request.url);
    // If main page then respond with root index.html
    if(Request.url == "/") {
        fs.readFile("./Views/Html/Index.html", function(Err, Stream) {
          if(!Err) {
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
      console.log("Not handling other requests at this point");
      Response.end();
      return resolve(Response);
    };
    //resolve(Response);
  });

}
module.exports = {
  "HandleIncomingRequest": HandleIncomingRequest
};
