const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const userRoute = require("./Routes/users");
const authRoute = require("./Routes/auth");
const conversationRoute = require('./Routes/conversation');
const messageRoute = require('./Routes/message');
const bookedSessionRoute = require('./Routes/bookedSession');

const User = require("./Models/User");

dotenv.config();

// Connection to MongoDB
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Successfully Connected to MongoDB!");
   
    //
    //  Debug helper functions can be called here:
    //
    //displayUsers();
    //deleteUser();

    }
);


// 
//  For Debug Purposes  (Displays all the users in databse)
//
async function displayUsers() {
    try {
      const users = await User.find({});
      console.log(users);
                }
    catch(err) {
      handleError(err);
    }
}

// 
//  For Debug Purposes  (Deletes a User)
//
async function deleteUser() {
    try {
      const users = await User.deleteOne({ username: 'Matthew3' });;
      console.log(users);
                }
    catch(err) {
      handleError(err);
    }
}

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully!");
    } catch (err) {
        console.log(err);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/bookedSessions", bookedSessionRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});