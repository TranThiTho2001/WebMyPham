const thuonghieu = require("../controllers/thuonghieu.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", thuonghieu.create); 
    //Retrieve all brand
    router.get("/", thuonghieu.findAll);

    // //Retrieve(lay = find) all favorite brand
    // router.get("/favorite", thuonghieu.findAllFavorite);

    //Retrieve a single brand with id
    router.get("/:id", thuonghieu.findOne);

    //Update a cbrand with id
    router.put("/:id", thuonghieu.update);

    //Delete a brand with id
    router.delete("/:id", thuonghieu.delete);

    app.use("/api/thuonghieu", router);

};