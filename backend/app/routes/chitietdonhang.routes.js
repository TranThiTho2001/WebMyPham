const chitietdonhang = require("../controllers/chitietdonhang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create an order details
    router.post("/", chitietdonhang.create); 
    //Retrieve all order details
    router.get("/", chitietdonhang.findAll);

    app.use("/api/chitietdonhang", router);

};