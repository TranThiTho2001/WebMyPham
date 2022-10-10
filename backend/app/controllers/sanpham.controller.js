const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const SanPham = db.SanPham;
const upload = require("../middlewares/upload");
exports.findAllFavorite = async (req, res) => {
    res.send( {message: "Hello san pham"} );
}
//*-------------Create a product 
exports.create = async(req,res) => {
    //validate request
    if(!req.body.SP_Ma){
        return res.send(new BadRequestError(400, "Mã sản phẩm không được bỏ trống!"));
    }
    if(!req.body.DMSP_Ma){
        return next(new BadRequestError(400, "Mã danh mục sản phẩm không được bỏ trống!"));
    }
    if(!req.body.TH_Ma){
        return next(new BadRequestError(400, "Mã thương hiệu không được bỏ trống!"));
    }
    if(!req.body.SP_Ten){
        return next(new BadRequestError(400, "Tên sản phẩm không được bỏ trống!"));
    }
    if(!req.body.SP_ThongTin){
        return next(new BadRequestError(400, "Thông tin sản phẩm không được bỏ trống!"));
    }
    // //Nay co duoc bo trong khong ????????
    if(!req.body.SP_SoLuongNhap){
        return next(new BadRequestError(400, "Số lượng sản phẩm nhập vào không được bỏ trống!"));
    }
    // //Nay co duoc bo trong khong ????????
    // if(!req.body.sp_soluongcon){
    //     return next(new BadRequestError(400, "Số lượng sản phẩm còn lại không được bỏ trống!"));
    // }
    if(!req.body.SP_GiaMuaVao){
        return next(new BadRequestError(400, "Giá mua sản phẩm không được bỏ trống!"));
    }
    if(!req.body.SP_GiaBanRa){
        return next(new BadRequestError(400, "Giá bán sản phẩm không được bỏ trống!"));
    }

    // Create a product
    const sanpham = new SanPham({
        SP_Ma: req.body.SP_Ma,
        DMSP_Ma: req.body.DMSP_Ma,
        TH_Ma: req.body.TH_Ma,
        SP_TenSanPham: req.body.SP_Ten,
        SP_ThongTin: req.body.SP_ThongTin,
        SP_SoLuongNhap: req.body.SP_SoLuongNhap,
        SP_GiaMuaVao: req.body.SP_GiaMuaVao,
        SP_GiaBanRa: req.body.SP_GiaBanRa,
        // SP_HinhAnh: req.body.SP_HinhAnh,    
        SP_HinhAnh : req.body.SP_HinhAnh.fileName,
        ownerId: req.userId,
    });

    console.log(req.file+"file");

  
        // Save product in the DB
    const [error, document] = await handle(sanpham.save());

    if(error) {
        return res.send(error);

    }
    return res.send(document);
    }



//*--------Retrive all product of store from the database
exports.findAll = async(req,res) => {
    const condition = { ownerId: req.userId };
    const SP_Ten = req.query.SP_Ten;
    if(SP_Ten) {
        condition.SP_Ten = { $regex: new RegExp(SP_Ten), $options: "i"};
    }

    const [error, documents] = await handle(
        SanPham.find(condition, '-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sản phẩm với mã ${req.params.SP_Ma}`)
        );
    }

    return res.send(documents);
};

//*-------Find a single product with an id
exports.findOne = async (req,res) => {
    const condition = {
        SP_Ma: req.params.SP_Ma
    };

    const [error, documents] = await handle(
        SanPham.findOne(condition, '-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sản phẩm!")
        );
    }
    if(!documents){
        return res.send("Khong tim thay");
    }
    return res.send(documents);
};

//*-----Update a product by the is in the request
exports.update = async (req, res) =>{
   if(!req.body){
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật sản phẩm không thể trống!")
        );
   }

   const condition = {
    _id: res.params.id,
    ownerId: req.userId,
   };

   const [error, document] = await handle(
        SanPham.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
   );
   if (error) {
    return next(
        new BadRequestError(500,`Lỗi trong quá trình cập nhật thông tin sản phẩm có mã id=${req.params.id}`
        )
    );
}

if (!document) {
    return next(new BadRequestError(404, "Không tìm thấy sản phẩm!"));
}

return res.send({ message: "Cập nhật thông tin sản phẩm thành công." });
};

//Delete a product with the specified id in the request
exports.delete = async (req,res) => {    
        const condition = {
            _id: req.params.id,
            ownerId: req.userId,
        };
    
        const [error, document] = await handle(
            SanPham.findOneAndDelete(condition, {
                projection: "-ownerId",
            })
        );
    
        if (error) {
            return next(
                new BadRequestError(500,`Không xóa được sản phẩm có mã ${req.params.id}`)
            );
        }
    
        if (!document) {
            return next(new BadRequestError(404, "Không tìm thấy sản phẩm"));
        }
    
        return res.send({ message: "Xóa sản phẩm thành công" });
    
};

