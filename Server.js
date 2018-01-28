var https = require('https');
var http = require('http');
var fs = require('fs');
var ServerScripts = require('./Controllers/RouteRequests.js');
var options = {};
var httpsServer = https.createServer(options, function(req, res) {
  console.log("Request from - " + req.socket.remoteAddress + " - requesting - " + req.url);
  res.setHeader("Content-Type", "text/html");
  res.setheader("Strict-Transport-Security", "max-age=604800");
  ServerScripts.HandleIncomingRequest(req, res);
});
var httpServer = http.createServer(function(req, res) {
  console.log("Normal http request received from - " + req.socket.remoteAddress);
  console.log("HTTP request for - " + req.url);
  ServerScripts.HandleIncomingRequest(req, res)
  .then(function(Response) {
    console.log("Completed request - " + req.url);
  })
  .catch(function(Error) {
    console.log("Error occured while processing - " + req.url + " - " + Error);
  });
});

// Start node js server
httpServer.listen(80);
httpsServer.listen(443, function() {
  console.log("Started server from - " + process.cwd());
});
