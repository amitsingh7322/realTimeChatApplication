const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const userRoute = require("./routes/user.route");
const { connetionMongoDB } = require("./db/connection.MongoDB");

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
dotenv.config();
app.use(express.json()); //to parse incoming request with json payload
app.use(cookieParser());
// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//test route
app.get("/", (req, res) => {
  res.send("yes you are hitting home page");
});

//routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
// app.use("/api/conversations", authRoute);

//starting server
app.listen(PORT, () => {
  connetionMongoDB();
  console.log(`server runnig on port ${PORT}`);
});
