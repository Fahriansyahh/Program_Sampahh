const express = require("express");
const app = express();
const passport = require("passport");
require("./src/config/oauthGoogle");
require("./src/config/oauthGithub");
const bodyParser = require("body-parser");
const Auth = require("./src/Routes/Authentication");
const MidlewareAuth = require("./src/Midleware/Auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const Oauth = require("./src/Routes/Oauth");
const typesofwaste = require("./src/Routes/typesofwaste");
const transactions = require("./src/Routes/transactions");
//!setup cors
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: "GET, PUT, PATCH, POST, DELETE, UPDATE, OPTIONS",
  })
);
//!setup cookie sesion

app.use(
  cookieSession({
    name: "session",
    keys: ["testing"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

//!setup passport
app.use(passport.initialize());
app.use(passport.session());

//!setup cookie parser
app.use(cookieParser("testingbe"));
//! setup acces control
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Ganti '*' dengan origin yang sesuai
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, UPDATE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

app.use(allowCrossDomain);

//! setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//!setup Midleware

app.use(MidlewareAuth);
//!setup router

app.use("/Jwt/v1", Auth);
app.use("/auth", Oauth);
app.use("/typesofwaste/v1", typesofwaste);
app.use("/transactions/v1", transactions);
//! setup Listen
app.listen(4000, () => {
  console.log("open in browser");
});
