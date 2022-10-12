<template>
    <div class="container frameQLDonHang">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang @click="CloseCDTH"/>
            </div>
            <div class="col-md-10">
                <div class="row topHeader" @click="CloseCDTH">
                    <QLHeader />
                </div>
                <div class="row bottomHeader" @click="CloseCDTH">
                    <div class="col-md-12">
                        <p>Danh sách đơn hàng</p>
                    </div>
                </div>
                <div class="row timkiem" @click="CloseCDTH">
                    <div class="col-md-5 input-group">
                        <input type="text" class="form-control" placeholder="Tìm theo tên" v-model="nameToSearch" />
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-outline-secondary" type="button" @click="searchName" style="width:30px; height: 38px">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>
                    <!-- Danh sach don hang theo trang thai -->
                    <div class="col-md-4" style="text-align: center;">
                        <p style="display: inline-block; padding-top: 4px;"> Trạng thái</p>
                        <div class="pagination nav-item dropdown" style="width:160px;">
                            <a class="nav-link btn" href="#" data-toggle="dropdown"
                                style=" width: max-content; padding-top: 3px;width:160px">
                                {{curentStatus}} <span class="fas fa-angle-down"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#"
                                    @click="findDHByStatus(`Tất cả`), setCurentStatus(`Tất cả`)">Tất cả</a>
                                <a class="dropdown-item" href="#" v-for="(trangthai,i) in trangthai " :key="i"
                                    @click="findDHByStatus(trangthai), setCurentStatus(trangthai)">{{trangthai}}</a>
                            </div>

                        </div>
                    </div>
                    <!-- Danh sach so trang hien thi -->
                    <div class="col-md-2">
                        <p style="display: inline-block; padding-top: 4px;">Trang:</p>
                        <div class="pagination nav-item dropdown">
                            <a class="nav-link  btn" href="#" data-toggle="dropdown"
                                style="border-radius: 7px; width: max-content; padding-top: 3px;">
                                <span class="fas fa-angle-down"></span>{{currentPage}}
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" v-for="(i,j) in num_pages() " :key="j"
                                    v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)"
                                    aria-controls="my-table"> {{i}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <button v-if="isOpenCTDH" class=" btn fas fa-window-close"
                            @click="isOpenCTDH=!isOpenCTDH" style="float:right; margin-top: 6px; font-size: 30px; color: red;">
                        </button>
                    </div>
                </div>
                <div class="row dsDanhMuc">
                    <table id="secondTable">
                        <thead>
                            <tr style="width:100%">
                                <th>STT</th>
                                <th>Mã đơn</th>
                                <th>Ngày đặt</th>
                                <th>Khách hàng</th>
                                <th>Tổng cộng</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row,i) in donhang" :key="i" @click="setActiveDonHang(row)" style="width:100%">
                                <td>{{i}}</td>
                                <td>{{row.DH_Ma}}</td>
                                <td>{{row.DH_NgayDat}}</td>
                                <td>{{row.KH_Ma}}</td>
                                <td>{{row.DH_TongTien}}</td>
                                <td>
                                    <button v-if="row.DH_TrangThai===`Mới`" @click="isOpenTrangThai=!isOpenTrangThai"
                                        class="btnTrangThaiDH"
                                        style="background-color:#00FFFF">{{row.DH_TrangThai}}</button>
                                    <button v-if="row.DH_TrangThai===`Đã xác nhận`"
                                        @click="isOpenTrangThai=!isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#DCD409">{{row.DH_TrangThai}}</button>
                                    <button v-if="row.DH_TrangThai===`Đã vận chuyển`"
                                        @click="isOpenTrangThai=!isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#FF9999">{{row.DH_TrangThai}}</button>
                                    <button v-if="row.DH_TrangThai===`Đã nhận hàng`"
                                        @click="isOpenTrangThai=!isOpenTrangThai" class="btnTrangThaiDH"
                                        style="background-color:#00BA13">{{row.DH_TrangThai}}</button>
                                    <button v-if="row.DH_TrangThai===`Đã hủy`" @click="isOpenTrangThai=!isOpenTrangThai"
                                        class="btnTrangThaiDH"
                                        style="background-color:#D30000">{{row.DH_TrangThai}}</button>
                                </td>
                                <td class="tdChucNang nav-item dropdown">
                                    <a class="nav-link  fas fa-ellipsis-v" data-toggle="dropdown" style="color:#515151">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#" @click="isOpenCTDH=!isOpenCTDH"><span
                                                class="fas fa-eye"></span> Xem chi tiết</a>
                                        <a class="dropdown-item" href="#" @click="isOpenCTDH=!isOpenCTDH"><span
                                                class="fas fa-file-invoice"
                                                style="font-size:18px; margin-left: 2px;"></span> Lập hóa đơn</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <QLDonHangCTDH v-if="isOpenCTDH" :chitietdonhang="chitietdonhang" :activeDonHang="activeDonHang"
                        :khachhang="khachhang" />
                </div>
            </div>
        </div>
    </div>
    <!-- -------------------------------------Bang cap nhat trang thai don hang------------------ -->
    <div class="dialogTrangThai" style="width: 30%;" v-if="isOpenTrangThai">
        <p style=" text-align:center; margin-top: 50px; font-size: 20px;">
            <span class="far fa-edit"></span> Cập nhật trạng thái đơn hàng
        </p>
        <div style="display:block; margin-left: 130px;" v-for="(trangthai, i) in trangthai" :key="i">
            <input type="radio" id="{{trangthai}}" name="trangthai_nd" value="{{trangthai}}"
                @click="setTrangThaiDH(trangthai)" v-if="trangthai===activeDonHang.DH_TrangThai" checked />
            <input type="radio" id="{{trangthai}}" name="trangthai_nd" value="{{trangthai}}"
                @click="setTrangThaiDH(trangthai)" v-else />
            <label for="{{trangthai}}">&nbsp; {{ trangthai}}</label><br>
        </div>
        <button class="btn btnCapNhat" @click="isOpenXacNhan=!isOpenXacNhan, isOpenTrangThai= !isOpenTrangThai"
            style="margin-left:100px">Cập nhật</button>
        <button class="btn btnHuy" @click="isOpenTrangThai=!isOpenTrangThai">Hủy</button>
    </div>
    <div class="dialogXacNhan" v-if="isOpenXacNhan">
        <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 20px;">
            Bạn chắc chắn muốn cập nhật trạng thái đơn hàng
            #{{activeDonHang.DH_Ma}}
        </p>
        <button class="btnYes btn btn-sm btn-outline-secondary"
            @click="updateDonHang(activeDonHang), isOpenXacNhan = !isOpenXacNhan" style="margin-left:170px">Yes</button>
        <button class="btnNo btn btn-sm btn-outline-secondary" @click="isOpenXacNhan = !isOpenXacNhan">No</button>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DonHangService from '../../../services/donhang.service';
import KhachHangService from '../../../services/khachhang.service';
import CTDHService from '../../../services/chitietdonhang.service';
import QLDonHangCTDH from '../../../components/QuanLy/QLDonHangCTDH.vue';

export default {
    name: `QLDonHang`,
    components: { DanhSachChucNang, QLHeader, QLDonHangCTDH },
    data() {

        return {
            donhang: [],
            khachhang: {},
            activeDonHang: {},
            chitietdonhang: [],
            isOpenCTDH: false,
            isOpenTrangThai: false,
            newTrangThai: "",
            isOpenXacNhan: false,
            trangthai: [
                "Mới", "Đã xác nhận", "Đã vận chuyển", "Đã nhận hàng", "Đã hủy",
            ],
            currentPage: 1,
            elementsPerPage: 9,
            ascending: false,
            curentStatus: "Tất cả",
        }

    },

    computed: {
        "columns": function columns() {
            if (this.donhang.length == 0) {
                return [];
            }
            return Object.keys(this.donhang[0])
        }
    },

    methods: {

        //Lay danh sach don hang
        async retrieveDonHang() {
            const [error, response] = await this.handle(
                DonHangService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.donhang = response.data;
                console.log(response.data);
            }

        },

        //Tinh so hang 
        get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.donhang.slice(start, end);
        },

        //Tinh so trang hien thi don hang
        num_pages() {
            return Math.ceil(this.donhang.length / this.elementsPerPage);

        },

        // Thay doi trang 
        async change_page(page) {
            this.currentPage = page;
        },

        //Tim kiem khach hang cua don hang
        async findKH() {
            const [error, response] = await this.handle(
                KhachHangService.getByID(this.activeDonHang.KH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.khachhang = response.data;
                console.log(response.data);
            }
        },

        //setactive don hang duoc chon
        async setActiveDonHang(DHActive) {
            this.activeDonHang = DHActive;
            this.findKH(this.activeDonHang.KH_Ma);
            this.retrieveChiTietDonHang(this.activeDonHang.KH_Ma);
        },

        // Lay danh sach chi tiet don hang của don hang
        async retrieveChiTietDonHang() {
            const [error, response] = await this.handle(
                CTDHService.findByMaDH(this.activeDonHang.DH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietdonhang = response.data;
                console.log(response.data);
            }
        },

        //setclose CTDH
        async CloseCDTH(){
            this.isOpenCTDH = false;
        },
        //set trang thai don hang
        async setTrangThaiDH(data) {
            console.log("Trang thasi" + data);
            this.newTrangThai = data;
        },

        // cap nhat don hang
        async updateDonHang(activeDonHang) {
            activeDonHang.DH_TrangThai = this.newTrangThai;
            const [error, response] = await this.handle(
                DonHangService.update(activeDonHang.DH_Ma, activeDonHang)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data + "Cap nhat thanh cong");
                this.retrieveDonHang();
            }
        },

        //Tim kiem don hang theo trang thai
        async findDHByStatus(status) {
            if (status == "Tất cả") {
                this.retrieveDonHang();
            }
            else {
                const [error, response] = await this.handle(
                    DonHangService.findByStatus(status)
                );
                if (error) {
                    console.log(error);
                } else {
                    this.donhang = response.data;
                }
            }

        },

        //Set trang thai don hang can tiem kiem
        async setCurentStatus(status) {
            this.curentStatus = status
        },

        // Tim nhan vien lap don hang
        async findNVByMaNV(MaNV){
            activeDonHang.DH_TrangThai = this.newTrangThai;
            const [error, response] = await this.handle(
                DonHangService.update(activeDonHang.DH_Ma, activeDonHang)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data + "Cap nhat thanh cong");
                this.retrieveDonHang();
            }
        }
    },

    mounted() {
        this.retrieveDonHang();
    }
};
</script>

<style>
.frameQLDonHang .dschucNang .navigationBar .dsChucNang .btnDonHang {
    background-color: #FFFFFF;
    color: #515151;
}

.number:hover,
.number.active {
    background: #717699;
}

.frameQLDonHang {
    background-color: #EAEAEA;
    border-radius: 30px;
    width: 100%;
    border-style: solid;
    border-color: #515151;
    position: relative;
}


.timkiem .btnTimKiem {
    background-color: #EAEAEA;
    border: none;
}


.timkiem .btnTimKiem:hover {
    background-color: #515151;
}

.dropdown-menu .dropdown-item:hover {
    background-color: #D9D9D9;
}

.dschucNang {
    background-color: #515151;
    border-radius: 26px;
}

.bottomHeader {
    margin-bottom: 2px;
    text-align: center;
    font-size: 20px;
}

.topHeader {
    margin-bottom: 2px;
    margin-right: -5px;
}

table {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    margin: 10px 10px 10px 10px;
    background-color: #D9D9D9;
    border-radius: 10px;
}

.tdChucNang {
    float: right;
    width: max-content;
}

.btnTrangThaiDH {
    border-radius: 7px;
    border: none;
    width: 100px;
}

.frameQLDonHang table th {
    text-align: left;
    color: #000000;
    padding: 8px;
    min-width: 30px;
    font-size: 14px;
}

.frameQLDonHang table td {
    text-align: left;
    padding: 8px;
    color: #000000;
    font-size: 14px;
}

.frameQLDonHang table tbody tr {
    background: #FFFFFF;
    border-radius: 7px;
    margin-top: 3px;
}

.pagination {
    float: right;
    margin-top: 2px;
    border-radius: 7px;
    height: 34px;
    width: 65px;
    border-style: solid;
    border-color: #515151;
    border-width: 1px;
}

.dialogTrangThai,
.dialogXacNhan {
    position: absolute;
    background-color: #F9F9F9;
    top: calc(32%);
    left: 55%;
    transform: translateX(-50%);
    width: max-content;
    border-radius: 16px;
    border: 1px solid #515151;
    ;
    display: block;
    color: #515151;
}

.dialogTrangThai .btnCapNhat,
.dialogTrangThai .btnHuy,
.dialogXacNhan .btnYes,
.dialogXacNhan .btnNo {
    width: 100px;
    background-color: #929292;
    border-radius: 15px;
    margin-right: 20px;
    margin-bottom: 50px;
    color: #FFFFFF;
}
</style>