const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const KhuyenMai = db.KhuyenMai;

// exports.findAllFavorite = async (req, res) => {
//     res.send( {message: "Hello Khuyen Mai"} );
// }
//*-------------Create a discount 
exports.create = async(req,res) => {
    //validate request
    if(!req.body.KM_Ma){
        return next(new BadRequestError(400, "Mã khuyến mãi không được bỏ trống!"));
    }
    if(!req.body.KM_Ten){
        return next(new BadRequestError(400, "Tên khuyến mãi không được bỏ trống!"));
    }
    if(!req.body.KM_GiaTri){
        return next(new BadRequestError(400, "Giá trị khuyến mãi không được bỏ trống!"));
    }
    if(!req.body.KM_NgayBatDau){
        return next(new BadRequestError(400, "Ngay bat dau khuyen mai không được bỏ trống!"));
    }
    if(!req.body.KM_NgayKetThuc){
        return next(new BadRequestError(400, "Ngày kết thuc khuyến mãi không được bỏ trống!"));
    }
    if(!req.body.KM_HinhAnh){
        return next(new BadRequestError(400, "Hình ảnh của khuyến mãi không được bỏ trống!"));
    }

    const KM_NgayBatDau = req.body.KM_NgayBatDau;
    const KM_NgayKetThuc = req.body.KM_NgayKetThuc;
// CHỖ NÀY KHÔNG BIẾT GÀY LẤY RA Ở DẠNG STRING HAY DATE
    if(KM_NgayBatDau > KM_NgayKetThuc){
        return next(new BadRequestError(400, "Ngày bắt đầu khuyến mãi phải nhỏ hơn ngày kết thúc khuyến mãi."));
    }

    // Create a discount
    const khuyenmai= new KhuyenMai({
        KM_Ma: req.body.KM_Ma,
        KM_Ten: req.body.KM_Ten,
        KM_GiaTri: req.body.KM_GiaTri,
        KM_NgayBatDau: req.body.KM_NgayBatDau,
        KM_NgayKetThuc: req.body.KM_NgayKetThuc,
        KM_HinhAnh: req.body.KM_HinhAnh,
    });
    if(req.file){
        khuyenmai.KM_HinhAnh = req.file.path;
    }
    // Save discount in the DB
    const [error, document] = await handle(khuyenmai.save());

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình tạo chương trình khuyến mãi!")
        );
    }
    return res.send(document);
};


//*--------Retrive all discounts of store from the database
exports.findAll = async(req,res) => {
    const condition = { ownerId: req.userId };
    const KM_Ten = req.query.KM_Ten;
    if(KM_Ten) {
        condition.KM_Ten = { $regex: new RegExp(KM_Ten), $options: "i"};
    }

    const [error, documents] = await handle(
        KhuyenMai.find(condition, '-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất khuyến mãi với mã ${req.params.KM_Ma}`)
        );
    }

    return res.send(documents);
};

//*-------Find a single discount with an id
exports.findOne = async (req,res) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId 
    };

    const [error, documents] = await handle(
        KhuyenMai.findOne(condition, '-ownerId')
    );

    if(error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất khuyến mãi!")
        );
    }
    if(!document){
        return next(new BadRequestError(404, "Không tìm thấy"));
    }
    return res.send(document);
};

//*-----Update a discount by the is in the request
exports.update = async (req, res) =>{
   if(!req.body){
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật chương trình khuyến mãi không thể trống!")
        );
   }

   const condition = {
    _id: res.params.id,
    ownerId: req.userId,
   };

   const [error, document] = await handle(
    KhuyenMai.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
   );
   if (error) {
    return next(
        new BadRequestError(500,`Lỗi trong quá trình cập nhật thông tin chương trình khuyến mãi có mã id=${req.params.id}`
        )
    );
}

if (!document) {
    return next(new BadRequestError(404, "Không tìm thấy chương trình khuyến mãi!"));
}

return res.send({ message: "Cập nhật thông tin chương trình khuyến mãi thành công." });
};

//Delete a discount with the specified id in the request
exports.delete = async (req,res) => {    
        const condition = {
            _id: req.params.id,
            ownerId: req.userId,
        };
    
        const [error, document] = await handle(
            KhuyenMai.findOneAndDelete(condition, {
                projection: "-ownerId",
            })
        );
    
        if (error) {
            return next(
                new BadRequestError(500,`Không xóa được chương trình khuyến mãi có mã ${req.params.id}`)
            );
        }
    
        if (!document) {
            return next(new BadRequestError(404, "Không tìm thấy chương trình khuyến mãi"));
        }
    
        return res.send({ message: "Xóa chương trình khuyến mãi thành công" });
    
};

