const donhang = require("../controllers/donhang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", donhang.create); 
    //Retrieve all categorys
    router.get("/", donhang.findAll);

    //Retrieve a single category with id
    router.get("/:DH_Ma", donhang.findOne);

    //Update a category with id
    router.put("/:id", donhang.update);

    //Delete a category with id
    router.delete("/:DH_Ma", donhang.delete);

    // //Delete all categorys
    // router.delete("/", danhmuc.deleteAll);

    app.use("/api/donhang", router);

};