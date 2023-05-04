const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDb = require("./db/connect");

// port to run the server on
const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(express.json())
const server = createServer(app);

// to use the socket.io with the express server
// we have given the second parameter as an object with cors property so that we can request from any origin
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// starting the database connection
connectDb();

// enabling the cors
app.use(cors());

// array to hold the connected users
let connectedUsers = [];
console.log("connected users are :")
console.log(connectedUsers)

// socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);
  connectedUsers.push(socket.id);
  // console.log("connected users are : "+connectedUsers);

  // sending the connected users array to the client
//   io.emit("connectedUsers", connectedUsers);

  socket.on("myname", (data) => {
   const {name} = data;
   console.log(name)
  });

  // removing the user from the connected users array
  socket.on("disconnect", () => {
    // connectedUsers.delete(socket.id);
  });
});

// to parse the request body as JSON data This is usefull in the POST request or we can say it works with those request which have body in it.
app.use(express.json());

app.post("/signedIn", (req, res) => {
  res.send("Hello from the server");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});