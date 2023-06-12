// express.js
const express = require("express"); // import express
const app = express();

// cors
const cors = require("cors"); // import cors to authorize external requests

const corsOptions = {
  origin: "*", // authorize local react (vite js) client
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  
};

app.use(cors(corsOptions));


// dotenv
require("dotenv").config({ path: "./config/.env" }); // .env file in config directory

// db connect
require("./config/database").connectToMongoDB(); // async function to connect to database

// json parsing
const bodyParser = require("body-parser"); // JSON parser to use body in POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
const postRoutes = require("./routes/post.routes.js"); // api urls
app.use("/", postRoutes); // root url

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`); // run server
});
