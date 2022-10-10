const danhmuc = require("../controllers/danhmuc.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", danhmuc.create); 
    //Retrieve all categorys
    router.get("/", danhmuc.findAll);

    // // //Retrieve(lay = find) all favorite category
    //  router.get("/favorite", danhmuc.findAllFavorite);

    //Retrieve a single category with id
    router.get("/:DM_Ma", danhmuc.findOne);

    //Update a category with id
    router.put("/:id", danhmuc.update);

    //Delete a category with id
    router.delete("/:DM_Ma", danhmuc.delete);

    // //Delete all categorys
    // router.delete("/", danhmuc.deleteAll);

    app.use("/api/danhmuc", router);

};