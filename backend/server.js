//import
const http = require("http");
const app = require("./app");
const bodyParser = require("body-parser");
const authConfig = require("./middleware/auth.middleware");

//Body parse configuration
server.use(bodyParser.urlencoded({ extended:true }));
server.use(bodyParser.json());

const port = "4000";
app.set("port", port);

const server = http.createServer(app);

// server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.use('/api/', authConfig);

server.listen(port);
