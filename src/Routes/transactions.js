const express = require("express");
const route = express.Router();
const transactions = require("../Controllers/ControlTransactions");
const { validateToken } = require("../Midleware/jwt");

route.post("/Create", validateToken, transactions.Created);
route.get("/GetAll", validateToken, transactions.GetAll);
route.get("/Chart", transactions.Chart);

module.exports = route;
