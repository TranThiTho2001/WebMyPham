const thuonghieu = require("../controllers/thuonghieu.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    //create a brand
    router.post("/", thuonghieu.create); 
    //Retrieve all brand
    router.get("/", thuonghieu.findAll);

    //Retrieve a single brand with id
    router.get("/:id", thuonghieu.findOne);

    //Update a cbrand with id
    router.put("/:id", thuonghieu.update);

    //Delete a brand with id
    router.delete("/:id", thuonghieu.delete);

    app.use("/api/thuonghieu", router);

};