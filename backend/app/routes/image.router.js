// const image = require("../controllers/image.controller");
const express = require("express");
const upload = require("../middlewares/upload");
const db = require("../models");
const Image = db.Image;
const handle = require("../helpers/promise");
module.exports = (app) => {
    var router = express.Router();
''

    router.post("/", upload.single('image'),async (req, res) => {

    console.log(req.file);
    
        // Create a customer
        const image = new Image({
            filename: req.body.filename,
    
            ownerId: req.userId,
        });
        // Save customer in the DB
        const [error, document] =  await handle(image.save());
    
        if (error) {
            return res.send(error);
    
        }
        return res.send(document);
    },
);
    router.get("/",async(req,res) => {

        const [error, documents] = await handle(
            Image.find()
        );
    
        if(error) {
            return next(
                new BadRequestError(500, "Lỗi trong quá trình truy xuất hoa don!")
            );
        }
        if(!documents){
            return res.send("Chua ton tai");
        }
        return res.send(documents);}
    );
        


//     //Retrieve all products
//     router.get("/", sanpham.findAll);

//     //Retrieve a single product with id
//     router.get("/:SP_Ma", sanpham.findOne);

//     //Update a product with id
//     router.put("/:SP_Ma", sanpham.update);

//     //Delete a product with id
//     router.delete("/:SP_Ma", sanpham.delete);

    // //Delete all products
    // router.delete("/", sanpham.deleteAll);

    app.use("/api/image", router);

};