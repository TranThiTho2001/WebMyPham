const mongoose = require("mongoose");
const createSanPhamModel = require("./sanpham.model");
const createThuongHieuModel = require("./thuonghieu.model");
const createDanhMucModel = require("./danhmuc.model");
const createKhuyenMaiModel = require("./khuyenmai.model");
const createDonHangModel = require("./donhang.model");
const createKhachHangModel = require("./khachhang.model");
const createChiTietdonHangModel = require("./chitietdonhang.model");

const db = {};
db.mongoose = mongoose;
db.SanPham = createSanPhamModel(mongoose);
db.ThuongHieu = createThuongHieuModel(mongoose);
db.DanhMuc = createDanhMucModel(mongoose);
db.KhuyenMai = createKhuyenMaiModel(mongoose);
db.DonHang = createDonHangModel(mongoose);
db.KhachHang = createKhachHangModel(mongoose);
db.ChiTietDonHang = createChiTietdonHangModel(mongoose);

module.exports = db;