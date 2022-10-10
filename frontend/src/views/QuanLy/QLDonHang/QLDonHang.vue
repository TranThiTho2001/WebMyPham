<template>
    <div class="container frameQLDonHang">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang />
            </div>
            <div class="col-md-10">
                <div class="row topHeader">
                    <QLHeader />
                </div>
                <div class="row bottomHeader">
                    <div class="col-md-12">
                        <p>Danh sách danh mục</p>
                    </div>
                </div>
                <div class="row timkiem">
                    <div class="col-md-5 input-group">
                        <input type="text" class="form-control" placeholder="Tìm theo tên" v-model="nameToSearch" />
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-outline-secondary" type="button" @click="searchName">
                                <span class="fa fa-search" style="font-size:18px"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-5">
                    </div>
                    <div class="col-md-2">
                        <button class=" btn btn-sm btn-outline-secondary" @click="goToThemDanhMuc">
                            Thêm Danh Mục
                        </button>
                    </div>
                </div>
                <div class="row dsDanhMuc">
                    <table id="secondTable">
                        <thead>
                            <tr style="width:100%">
                                <th>STT</th>
                                <!-- <th v-for="(col,i) in columns" :key="i">{{col}}</th> -->
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
                                <!-- <td v-for="(col,i) in columns" :key="i">{{row[col]}}</td> -->
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
                                <td class="tdChucNang nav-item dropdown" >
                                    <a class="nav-link  fas fa-ellipsis-v"
                                        data-toggle="dropdown" style="color:#515151">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#" @click="isOpenCTDH=!isOpenCTDH"><span class="fas fa-eye"></span> Xem chi tiết</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <QLDonHangCTDH v-if="isOpenCTDH" :chitietdonhang="chitietdonhang" :activeDonHang="activeDonHang"
                        :tenkhachhang="tenkhachhang" />
                </div>
            </div>
        </div>
    </div>
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
            tenkhachhang: "",
            activeDonHang: {},
            chitietdonhang: [],
            isOpenCTDH: false,
            isOpenTrangThai: false,
            newTrangThai: "",
            isOpenXacNhan: false,
            trangthai: [
                "Mới", "Đã xác nhận", "Đã vận chuyển", "Đã nhận hàng", "Đã hủy",
            ]
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
        async findtenKH() {
            const [error, response] = await this.handle(

                KhachHangService.getByID(this.activeDonHang.KH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.tenkhachhang = response.data.KH_Ten;
                console.log(response.data);
            }
        },
        async setActiveDonHang(DHActive) {
            this.activeDonHang = DHActive;
            this.findtenKH(this.activeDonHang.KH_Ma);
            this.retrieveChiTietDonHang(this.activeDonHang.KH_Ma);
        },

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
        async setTrangThaiDH(data) {
            console.log("Trang thasi" + data);
            this.newTrangThai = data;
        },
        async updateDonHang(activeDonHang) {
            activeDonHang.DH_TrangThai = this.newTrangThai;
            console.log(activeDonHang.DH_TrangThai);
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
.dschucNang .navigationBar .dsChucNang .btnDanhMuc {
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

.frameQLDonHang table td:last-child {
    border-right: none;
}

.frameQLDonHang table tbody tr {
    background: #FFFFFF;
    border-radius: 7px;
    margin-top: 3px;
}

.dialogTrangThai,
.dialogXacNhan {
    position: absolute;
    background-color: #F9F9F9;
    bottom: calc(18%);
    left: 55%;
    transform: translateX(-50%);
    width: max-content;
    border-radius: 16px;
    border: 1px solid #515151;;
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