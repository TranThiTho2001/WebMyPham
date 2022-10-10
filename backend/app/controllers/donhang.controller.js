const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const DonHang = db.DonHang;

exports.create = async (req, res) => {

    //validate request
    if (!req.body.DH_Ma) {
        return res.send(new BadRequestError(400, "Mã đơn hàng không được bỏ trống!"));
    }
    if (!req.body.NV_Ma) {
        return next(new BadRequestError(400, "Mã nhân viên không được bỏ trống!"));
    }
    if (!req.body.KH_Ma) {
        return next(new BadRequestError(400, "Mã khách hàng không được bỏ trống!"));
    }
    if (!req.body.HD_SoHD) {
        return next(new BadRequestError(400, "Số hóa đơn không được bỏ trống!"));
    }
    if (!req.body.DH_NgayDat) {
        return next(new BadRequestError(400, "Ngày đặt hàng không được bỏ trống!"));
    }
    if (!req.body.DH_TongSoLuong) {
        return next(new BadRequestError(400, "Tổng số lượng sản phẩm không được bỏ trống!"));
    }
    if (!req.body.DH_TongTien) {
        return next(new BadRequestError(400, "Tổng tiền của đơn hàng không được bỏ trống!"));
    }
    if (!req.body.DH_TrangThai) {
        return next(new BadRequestError(400, "Trạng thái của đơn hàng không được bỏ trống!"));
    }

    // Create a product
    const donhang = new DonHang({
        DH_Ma: req.body.DH_Ma,
        NV_Ma: req.body.NV_Ma,
        KH_Ma: req.body.KH_Ma,
        HD_SoHD: req.body.HD_SoHD,
        DH_NgayDat: req.body.DH_NgayDat,
        DH_TongSoLuong: req.body.DH_TongSoLuong,
        DH_TongTien: req.body.DH_TongTien,
        DH_GhiChu: req.body.DH_GhiChu,
        // SP_HinhAnh: req.body.SP_HinhAnh,    
        DH_TrangThai: req.body.DH_TrangThai,
        ownerId: req.userId,
    });
    // Save product in the DB
    const [error, document] = await handle(donhang.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
};


//*--------Retrive all product of store from the database
exports.findAll = async (req, res) => {
    // const condition = { ownerId: req.userId };
    // const DH_Ma= req.query.DH_Ma;
    // if(DH_Ma) {
    //     condition.DH_Ma = { $regex: new RegExp(DH_Ma), $options: "i"};
    // }

    const [error, documents] = await handle(
        DonHang.find()
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sản phẩm với mã ${req.params.DH_Ma}`)
        );
    }
    return res.send(documents);
};

//*-------Find a single product with an id
exports.findOne = async (req, res) => {
    const condition = {
        DH_Ma: req.params.DH_Ma
    };

    const [error, documents] = await handle(
        DonHang.findOne(condition, '-ownerId')
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sản phẩm!")
        );
    }
    if (!documents) {
        return res.send("Khong tim thay");
    }
    return res.send(documents);
};

//*-----Update a product by the is in the request
exports.update = async (req, res) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Dữ liệu cập nhật sản phẩm không thể trống!")
        );
    }

    const condition = {
        // _id: res.params.id,
        // ownerId: req.userId,
        DH_Ma: req.body.DH_Ma,
    };

    const [error, document] = await handle(
        DonHang.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin sản phẩm có mã id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy sản phẩm!"));
    }

    return res.send({ message: "Cập nhật thông tin sản phẩm thành công." });
};

//Delete a product with the specified id in the request
exports.delete = async (req, res) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        DonHang.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(500, `Không xóa được sản phẩm có mã ${req.params.id}`)
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy sản phẩm"));
    }

    return res.send({ message: "Xóa sản phẩm thành công" });

};

