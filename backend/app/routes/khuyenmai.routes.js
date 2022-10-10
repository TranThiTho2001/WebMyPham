const khuyenmai = require("../controllers/khuyenmai.controller");
const express = require("express");
const upload = require('../middlewares/upload')
module.exports = (app) => {
    var router = express.Router();

    router.post("/", upload.single('KM_HinhAnh'), khuyenmai.create); 
    //Retrieve all discounts
    router.get("/", khuyenmai.findAll);

    // //Retrieve(lay = find) all favorite discounts
    // router.get("/favorite", khuyenmai.findAllFavorite);

    //Retrieve a single discount with id
    router.get("/:id", khuyenmai.findOne);

    //Update a discount with id
    router.put("/:id", khuyenmai.update);

    //Delete a discount with id
    router.delete("/:id", khuyenmai.delete);

    // //Delete all discounts
    // router.delete("/", khuyenmai.deleteAll);

    app.use("/api/khuyenmai", router);

};