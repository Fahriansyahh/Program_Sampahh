const express = require("express");
const route = express.Router();
const { body, query } = require("express-validator");
const typesofwaste = require("../Controllers/ControlTypesOfWaste");
const { validateToken } = require("../Midleware/jwt");
const typesOfWaste = require("../models/typesOfWaste");

route.post(
  "/Create",
  // validateToken,
  [
    body("garbagetypename")
      .isLength({ min: 1 })
      .withMessage("GarbageTypeName min 1"),
    body("description")
      .isLength({ min: 1, max: 200 })
      .withMessage("desciption min 1 max 200"),
    body("pricekilogramme").isLength({ min: 1 }).withMessage("username min 1 "),
  ],
  typesofwaste.Create
);

route.get("/GetAll", validateToken, typesofwaste.GetAll);

route.put(
  "/Updated",
  validateToken,
  [
    query("waste")
      .isLength({ min: 1 })
      .withMessage("Title too short. Enter a longer title!"),
    body("garbagetypename")
      .isLength({ min: 1 })
      .withMessage("GarbageTypeName min 1"),
    body("description")
      .isLength({ min: 1, max: 200 })
      .withMessage("desciption min 1 max 200"),
    body("pricekilogramme").isLength({ min: 1 }).withMessage("username min 1 "),
  ],
  typesofwaste.Update
);
route.delete(
  "/Search",
  validateToken,
  [
    query("search")
      .isLength({ min: 1 })
      .withMessage("Title too short. Enter a longer title!"),
  ],
  typesofwaste.Delete
);

route.get("/Search", validateToken, typesofwaste.Search);

module.exports = route;
