const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDb = require("./db/connect");
const { emit } = require("process");

const User = require("./db/schema/userSchema");

// port to run the server on
const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
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

// socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);
  // connectedUsers.push(socket.id);
  // console.log("connected users are : "+connectedUsers);

  // sending the connected users array to the client
  //   io.emit("connectedUsers", connectedUsers);

  socket.on("my_data", (data) => {
    // first we wil check if the user is already registered or not
    // if the user is already registered then we will not add it to the connected users array

    const { displayName, email, photoURL } = data.singedInUser;
    console.log("is user already registered :");
   
    const findDublicateEmail=()=>{
      User.findOne({email : email}).then((result)=>{
        console.log(result);
        if(result){
          console.log("user already exists");
        }
        else{
          const newUser = new User({
            displayName,
            email,
            photoURL,
          });
      
          if (displayName) {
            newUser
              .save()
              .then(() => {
                console.log("User saved successfully");
              })
              .catch((err) => {
                if (err.code === 11000) {
                  // Check for duplicate key error
                  console.log("Email already exists");
                } else {
                  console.log("Error saving user: ", err);
                }
              });
          }
        }
      })     
    }
    findDublicateEmail();
    // console.log(User.findOne({email : email}))

   

    if (displayName) {
      connectedUsers.push({ user: data.singedInUser, socketId: data.socketId });
    }
    console.log(data);
    // console.log("my data is : " + displayName, email, photoURL);
    if (data.singedInUser.displayName) {
      // sending the connected users array to all the clients except the one who is sending the data
      socket.broadcast.emit("refresh_user_list", connectedUsers);

      // sending the connected users array to the client who is sending the data
      io.to(data.socketId).emit("refresh_user_list", connectedUsers);
    }
  });

  socket.on("message", (data) => {
    const { id, message } = data;
    io.to(id).emit("message", message);
    console.log(data);
  });

  socket.on("send_friend_request", (data) => {
    console.log(data);
    const { from, to } = data;

    const findDublicateRequest=()=>{
      User.findOne({email : to}).then((result)=>{
        if(result.request.find(object => object.from === from  ) ){
          console.log(result)
          console.log("Request already sent");
        }
        else{
         
          const newRequest = {
            from: from,
            to: to,
          };
      
          User.updateOne(
            { email: to }, // filter for the document to update
            { $push: { request: newRequest } } // update the document with the new address

          )
            .then((result) => {
              console.log("The document is updated");
            })
            .catch((err) => {
              console.error("error :" + err);
            });
        }
      })     
    }
    findDublicateRequest();

   

    // const { id, message } = data;
    // io.to(id).emit("message", message);
  });

  // removing the user from the connected users array
  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );

    // to resfresh the user list on the client side
    socket.broadcast.emit("refresh_user_list", connectedUsers);
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
