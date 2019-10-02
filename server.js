const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");

//Configure dotenv package
dotenv.config();

console.log("App started.");
const port = process.env.PORT || 3000;

const server = http.createServer(app);
console.log("Creating server...");

server.listen(port);
console.log(`Server is up and listening at port ${port}...`);
