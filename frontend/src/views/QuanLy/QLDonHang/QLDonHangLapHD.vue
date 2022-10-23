<template>
    <div class="container frameLapHoaDon">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNV="NhanVien"/>
            </div>
            <div class="col-md-10">
                <div class="row topHeader">
                    <QLHeader :maNV="localNhanVien.NV_Ma" />
                </div>
                <div class="row bottomHeader" v-if="!isOpenLapHD">
                    <div class="col-md-12">
                        <p>Lập hóa đơn</p>
                        <p></p>
                    </div>
                </div>

                <div class="row container hoadon" v-if="!isOpenLapHD">
                    <div class="col-md-12">
                        <div class="row" style="width:60px"> <img src="../../../images/Logo.png "
                                class="rounded float-left img-fluid">
                        </div>
                        <h4 style="text-align:center"> HÓA ĐƠN </h4>
                        <div class="row">
                            <table class="bangTT">
                                <tr>
                                    <!-- <td>Số HD:  tt</td> -->
                                    <td>Khách hàng: {{khachhang.KH_Ten}}</td>
                                    <td>Nhân viên: {{nhanvien.NV_Ho+nhanvien.NV_Ten}} </td>
                                </tr>
                                <tr>
                                    <!-- <td>Ngày lập: </td> -->
                                    <td>Mã DH: {{MaDH}}</td>
                                    <td>SDT: {{khachhang.KH_SDT}} </td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ giao hàng: {{donhang.DH_DiaChiGiaoHang}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="row">
                            <table class="bangCTDH table-bordered">
                                <thead>
                                    <tr style="width:100%">
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,i) in chitietdonhang" :key="i" style="width:100%">
                                        <td>{{i+1}}</td>
                                        <td>{{row.SP_Ten}} </td>
                                        <td>{{row.CTDH_SoLuong}}</td>
                                        <td>{{row.CTDH_Gia}}</td>
                                        <td>{{row.CTDH_SoLuong * row.CTDH_Gia}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="col-md-12" style="text-align: right; margin-bottom: 15px;">
                                <h6 style="text-align: right; margin-right: 100px;">Thành tiền:
                                    {{donhang.DH_TongTien}}
                                </h6>
                            </div>
                        </div>
                    </div>

                </div>
                <HoaDonChiTiet v-if="isOpenLapHD" :khachhang="khachhang" :chitietdonhang="chitietdonhang"
                    :nhanvien="nhanvien" :hoadon="hoadon" :donhang="donhang" />
                <div class="row" >
                    <div class="col-md-10" v-if="!isOpenLapHD">
                        <button class="btnLapHoaDon" @click="isOpenXacNhan=!isOpenXacNhan">
                            Lập Hóa Đơn
                        </button>
                    </div>
                    <div class="col-md-2">
                        <button class="btnTroVe" @click="goToQLDonHang">
                            Tro ve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="dialogXacNhan" v-if="isOpenXacNhan">
        <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 20px;">
            Bạn chắc chắn muốn lập hóa đơn cho đơn hàng
            #{{donhang.DH_Ma}}
        </p>
        <button class="btnYes btn btn-sm btn-outline-secondary"
            @click="findHoaDon(), isOpenXacNhan = !isOpenXacNhan, isOpenLapHD=!isOpenLapHD"
            style="margin-left:170px">Yes</button>
        <button class="btnNo btn btn-sm btn-outline-secondary" @click="isOpenXacNhan = !isOpenXacNhan">No</button>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DonHangService from '../../../services/donhang.service';
import KhachHangService from '../../../services/khachhang.service';
import CTDHService from '../../../services/chitietdonhang.service';
import NhanVienService from '../../../services/nhanvien.service';
import SanPhamService from '../../../services/sanpham.service';
import HoaDonService from '../../../services/hoadon.service';
import HoaDonChiTiet from '../../../components/QuanLy/HoaDonChiTiet.vue';

export default {
    name: `QLDonHang`,
    components: { DanhSachChucNang, QLHeader, HoaDonChiTiet },

    props: ["DH_Ma"],
    computed: {
        getMaDH() {
            return this.$route.params.MaHD;
        }
    },
    data() {

        return {
            donhang: {},
            khachhang: {},
            chitietdonhang: [],
            nhanvien: {},
            MaDH: "",
            isOpenXacNhan: false,
            isOpenLapHD: false,
            hoadon: {},
            message: "",
            localNhanVien: {},
        }
    },

    created() {
        this.MaDH = this.$route.params.id;
        this.localNhanVien.NV_Ma = this.$route.params.user;
    },

    methods: {

        //Lay thong tin don hang
        async retrieveDonHang() {
            const [error, response] = await this.handle(
                DonHangService.getByID(this.MaDH)
            );
            if (error) {
                console.log(error);
            } else {
                this.donhang = response.data;
                this.findKH(this.donhang.KH_Ma);
                this.findNVByMaNV(this.donhang.NV_Ma)
                console.log(response.data);
            }

        },

        //Tim kiem khach hang cua don hang
        async findKH(MaKH) {
            console.log("Khach hang" + MaKH)
            const [error, response] = await this.handle(
                KhachHangService.getByID(MaKH)
            );
            if (error) {
                console.log(error);
            } else {
                this.khachhang = response.data;
                console.log(response.data + "Khach hang" + this.khachhang.KH_DiaChi);
            }
        },

        // Lay danh sach chi tiet don hang của don hang
        async retrieveChiTietDonHang() {
            const [error, response] = await this.handle(
                CTDHService.findByMaDH(this.MaDH)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietdonhang = response.data;
                console.log(response.data);
                for (const i in this.chitietdonhang) {
                    console.log("Ma " + this.chitietdonhang[i].SP_Ma);
                    this.findSanPham(this.chitietdonhang[i].SP_Ma, i);
                }

            }
        },

        // Tim nhan vien lap don hang
        async findNVByMaNV(MaNV) {
            const [error, response] = await this.handle(
                NhanVienService.getByID(MaNV)
            );
            if (error) {
                console.log(error);
            } else {
                this.nhanvien = response.data;
            }
        },

        async findSanPham(maSP, i) {
            const [error, response] = await this.handle(
                SanPhamService.getByID(maSP)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietdonhang[i].SP_Ten = response.data.SP_Ten;
            }
        },
        // Kiem tra don hang da duoc lap hoa don chua
        async findHoaDon() {
            const [error, response] = await this.handle(
                HoaDonService.getByIDMaDH(this.donhang.DH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data == "Chua ton tai") {
                    this.createHoaDon();
                    console.log(response.data);
                }
                else {
                    console.log("da ton tai");
                    console.log(response.data);
                }

            }
        },

        //Lap hoa don
        async createHoaDon() {
            this.hoadon.DH_Ma = this.donhang.DH_Ma;
            this.hoadon.HD_NgayLap = new Date().toLocaleDateString();
            this.hoadon.HD_ThoiGianLap = new Date().toLocaleTimeString();
            this.hoadon.HD_TongTien = this.donhang.DH_TongTien;

            const [error, response] = await this.handle(
                HoaDonService.create(this.hoadon)
            );
            if (error) {
                console.log(error);
            } else {
                this.hoadon = response.data;
                console.log(response.data);
            }
        },

        async goToQLDonHang(){
            console.log(this.localNhanVien.NV_Ma)
            this.$router.push({ name: 'QLDonHang', params: {id: this.localNhanVien.NV_Ma}})
        }
    },

    mounted() {
        this.retrieveDonHang();
        this.retrieveChiTietDonHang();
    }
};
</script>

<style>
@import "../../../assets/QLDonHangStyle.css"
</style>