const chitietdonhang = require("../controllers/chitietdonhang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", chitietdonhang.create); 
    //Retrieve all categorys
    router.get("/", chitietdonhang.findAll);

    // // //Retrieve(lay = find) all favorite category
    //  router.get("/favorite", danhmuc.findAllFavorite);

    //Retrieve a single category with id
    // router.get("/:DH_Ma", chitietdonhangfindOne);

    //Update a category with id
    // router.put("/:id", chitietdonhang.update);

    //Delete a category with id
    // router.delete("/:DM_Ma", chitietdonhang.delete);

    // //Delete all categorys
    // router.delete("/", danhmuc.deleteAll);

    app.use("/api/chitietdonhang", router);

};