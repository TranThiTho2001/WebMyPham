const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const KhachHang = db.KhachHang;
const upload = require("../middlewares/upload");
exports.findAllFavorite = async (req, res) => {
    res.send({ message: "Hello san pham" });
}
//*-------------Create a product 
exports.create = async (req, res) => {
    //validate request
    if (!req.body.KH_Ten) {
        return next(new BadRequestError(400, "Tên không được bỏ trống!"));
    }

    if (!req.body.KH_SDT) {
        return next(new BadRequestError(400, "SDT đăng ký tài khoản không được bỏ trống!"));
    }
    if (!req.body.KH_MatKhau) {
        return next(new BadRequestError(400, "Mật khẩu tài khoản không được bỏ trống!"));
    }

    // Create a product
    const khachhang = new KhachHang({
        KH_Ten: req.body.KH_Ten,
        KH_SDT: req.body.KH_SDT,
        KH_MatKhau: req.body.KH_MatKhau,
        ownerId: req.userId,
    });
    // Save product in the DB
    const [error, document] = await handle(khachhang.save());

    if (error) {
        return res.send(error);

    }
    return res.send(document);
}



//*--------Retrive all product of store from the database
exports.findAll = async (req, res) => {
    const condition = { ownerId: req.userId };
    const KH_SDT = req.query.name;
    console.log(req.query.name);
    if (KH_SDT) {
        condition.KH_SDT = { $regex: new RegExp(KH_SDT), $options: "i" };
    }

    const [error, documents] = await handle(
        KhachHang.find(condition, '-ownerId')
    );

    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình truy xuất sản phẩm với mã ${req.params.KH_Ten}`)
        );
    }

    return res.send(documents);
};

//*-------Find a single product with an id
exports.findOneByID = async (req, res) => {
    const condition = {
        KH_Ma: req.params.KH
    };
    const [error, documents] = await handle(
        KhachHang.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sản phẩm!")
        );
    }
    if (!documents) {
        return res.send("Khong tim thay id");
    }
    return res.send(documents);
};

//*-------Find a single product with an id
exports.findOneByPhone = async (req, res) => {

    const condition = {
        KH_SDT: req.params.KH_SDT
    };

    const [error, documents] = await handle(
        KhachHang.findOne(condition, '-ownerId')
    );

    if (error) {
        return next(
            new BadRequestError(500, "Lỗi trong quá trình truy xuất sản phẩm!")
        );
    }
    if (!documents) {
        return res.send("Khong tim thay Phone");
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
        KH_SDT: req.body.KH_SDT,
    };

    const [error, document] = await handle(
        KhachHang.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(500, `Lỗi trong quá trình cập nhật thông tin sản phẩm có mã id=`
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
        KH_SDT: req.body.KH_SDT,
    };

    const [error, document] = await handle(
        KhachHang.findOneAndDelete(condition, {
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

