const express = require("express");
const route = express.Router();
const transactions = require("../Controllers/ControlTransactions");
const { validateToken } = require("../Midleware/jwt");

route.post("/Create", transactions.Created);
route.get("/GetAll", transactions.GetAll);
route.get("/Chart", transactions.Chart);

module.exports = route;
