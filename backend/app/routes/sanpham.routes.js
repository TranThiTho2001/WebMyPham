const sanpham = require("../controllers/sanpham.controller");
const express = require("express");
const upload = require("../middlewares/upload");
module.exports = (app) => {
    var router = express.Router();
''
    router.post("/",upload.single('file'),sanpham.create); 
    console.log("req.body.SP_HinhAnh");
    //Retrieve all products
    router.get("/", sanpham.findAll);

    // //Retrieve(lay = find) all favorite products
    router.get("/favorite", sanpham.findAllFavorite);

    //Retrieve a single product with id
    router.get("/:id", sanpham.findOne);

    //Update a product with id
    router.put("/:id", sanpham.update);

    //Delete a product with id
    router.delete("/:id", sanpham.delete);

    // //Delete all products
    // router.delete("/", sanpham.deleteAll);

    app.use("/api/sanpham", router);

};