const khachhang = require("../controllers/khachhang.controller");
const express = require("express");

module.exports = (app) => {
    var router = express.Router();

    router.post("/", khachhang.create); 
    //Retrieve all categorys
    router.get("/", khachhang.findAll);

    // // //Retrieve(lay = find) all favorite category
    //  router.get("/favorite", danhmuc.findAllFavorite);

    //Retrieve a single category with id
    router.get("/:KH", khachhang.findOneByID);
    
    //Update a category with id
    router.put("/:id", khachhang.update);

    //Delete a category with id
    router.delete("/:KH_SDT", khachhang.delete);

    // //Delete all categorys
    // router.delete("/", danhmuc.deleteAll);

    app.use("/api/khachhang", router);

};