// imports dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// local file dependencies
import router from "./routes.js";
import User from "./model/User.js";
import AddContact from "./model/AddContact.js";
const app = express();
const server = createServer(app);
const io = new Server(server);

// middlewares
app.use(cors());
app.use(express.json({ type: "application/json" }));
app.use(morgan("dev"));
app.use(helmet({ contentSecurityPolicy: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// serve the static pages
app.use(express.static(path.join(__dirname, "../public/dist")));

// different routes
app.use("/services", router);

// socket related events
import { allSocketOps } from "./socketOps.js";
allSocketOps(io);
import { connectDbAndRunQueries } from "./dbOps.js";
//Second Db COnnection

const db =
  "mongodb+srv://sheryar:sheryar1234@cluster0.zx0l6.mongodb.net/chatapp?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("2nd MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.post("/addrooms", (req, res) => {
  connectDbAndRunQueries("addRoom", req, res);
});

app.post("/data", (req, res) => {
  const data = new AddContact({
    username: req.body.username,
    phone_number: req.body.phone_number,
    addedby: req.body.addedby,
  });
  const phone_number = req.body.phone_number;
  const username = req.body.username;
  const userid = req.body.addedby;
  if (username && phone_number) {
    AddContact.find(
      { $and: [{ phone_number: phone_number }, { addedby: userid }] },
      function (err, fg) {
        console.log("fg is", fg);
        console.log(typeof fg);
        if (Object.keys(fg).length == 0) {
          data
            .save()
            .then((a) => {
              res.status(200);
            })
            .catch(() => {
              console.log("NOt Saved");
            });
        } else if (Object.keys(fg).length > 0) {
          res.status(300);
        } else {
          console.log("Query Error");
        }
      }
    );
  } else {
    //For Empty fields
    res.status(400);
  }
});

app.post("/record", async (req, res) => {
  try {
    console.log("Req body is ", req.body.userid);
    AddContact.find({ addedby: req.body.userid }, function (err, data) {
      if (data) {
        res.send(data);
      } else {
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// app.post("/data", (req, res) => {
//   res.setHeader("Content-Type", "text/html");
//   const data = new User({
//     username: req.body.username,
//     phone_number: req.body.phone_number,
//   });

//   console.log("Username is ", data.username);
//   console.log("Phone Number ", data.phone_number);
//   data
//     .save()
//     .then(() => {
//       console.log("Saved");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// listen
server.listen(process.env.PORT, () => {
  console.log("Server is running on ", process.env.PORT);
});
