const express = require("express");
const route = express.Router();
const { body, query } = require("express-validator");
const Auth = require("../Controllers/ControlAuthentication");
const { validateToken } = require("../Midleware/jwt");

//!login

route.post("/Auth/Login", Auth.Login);

// //!create
route.post(
  "/Auth",
  [
    body("username")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
    body("password")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
  ],
  Auth.Create
);
// //!get all
route.get("/Auth", validateToken, Auth.getAll);

// //!update

route.put(
  "/Auth",
  validateToken,
  [
    query("username")
      .isLength({ min: 1, max: 12 })
      .withMessage("Title too short. Enter a longer title!"),
    body("username")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
    body("password")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
  ],
  Auth.Update
);

// //!hapus
route.delete(
  "/Auth",
  validateToken,
  [
    query("username")
      .isLength({ min: 1, max: 12 })
      .withMessage("Title too short. Enter a longer title!"),
  ],
  Auth.Delete
);
//! search

route.get("/Auth/Search", validateToken, Auth.search);

module.exports = route;
