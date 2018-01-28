// Main file to handle incoming requests and route to right path.
var https = require('https');
var fs = require('fs');
var url = require('url');

function FetchResponse(URL) {
  return new Promise(function(resolve, reject) {
    fs.readFile(URL, function(Error, Stream) {
      if(!Error) {
        resolve(Stream);
      }
      else reject(Error);
    });
  });
} // End of FetchResponse

function GetContentType(URL) {
  // Return content type
  var ContentType = "html";
  if(URL.toLowerCase().endsWith("css")) {
    ContentType = "css";
  }
  else if (URL.toLowerCase().endsWith("js")) {
    ContentType = "js";
  }
  else if(URL.toLowerCase().endsWith("jpeg") || URL.toLowerCase().endsWith("jpg")) {
    ContentType = "jpeg";
  }
  return ContentType;
} // End of GetContentType

function HandleIncomingRequest(Request, Response) {
  return new Promise(function(resolve, reject) {
    var ContentTypes = {
      "css": "text/css",
      "js": "application/javascript",
      "html": "text/html",
      "jpeg": "image/jpeg"
    };
    var Path = {
      "/": "/Views/Html/Index.html"
    };
    var URL = ".";
    URL = URL + (Path[Request.url] ? Path[Request.url] : Request.url);
    var ContentType = ContentTypes[GetContentType(URL)];
    console.log("Processing request - " + URL);
    FetchResponse(URL)
    .then(function(Data) {
      Response.statusCode = "200";
      Response.setHeader = ("Content-Type", ContentType);
      Response.write(Data);
      Response.end();
      resolve(Response);
    })
    .catch(function(Error) {
      console.log("Error occured while processing - " + URL + " - " + Error);
      Response.end();
      reject(Response);
    });
  }); // End of FetchResponse
} // End of HandleIncomingRequest

module.exports = {
  "HandleIncomingRequest": HandleIncomingRequest
};
