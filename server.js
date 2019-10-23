const http = require("http");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = require("./app");

console.log("Creating server...");
http.createServer(app).listen(port, function() {
  console.log("Server is up and running on port ", process.env.PORT || 3000);
});
