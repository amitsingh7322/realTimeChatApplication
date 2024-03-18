const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const userRoute = require("./routes/user.route");
const { connetionMongoDB } = require("./db/connection.MongoDB");
const { app, server } = require("./socket/socket");


const PORT = process.env.PORT || 8000;
const dirname = path.resolve()

//middlewares
dotenv.config();
app.use(express.json()); //to parsse incoming request with json payload
app.use(cookieParser());
// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//test route
// app.get("/", (req, res) => {
//   res.send("yes you are hitting home page");
// });

//routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.use(express.static(path.join(dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(dirname, "frontend", "dist", "index.html"));
});
//starting server
server.listen(PORT, () => {
  connetionMongoDB();
  console.log(`server runnig on port ${PORT}`);
});
