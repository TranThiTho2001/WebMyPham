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
                            <tr v-for="(row,i) in donhang" :key="i" @click="setActiveDonHang(row)"
                                style="width:100%">
                                <td>{{i}}</td>
                                <!-- <td v-for="(col,i) in columns" :key="i">{{row[col]}}</td> -->
                                <td>{{row.DH_Ma}}</td>
                                <td>{{row.DH_NgayDat}}</td>
                                <td>{{row.KH_Ma}}</td>
                                <td>{{row.DH_TongTien}}</td>
                                <td><button @click="isOpenTrangThai=!isOpenTrangThai">{{row.DH_TrangThai}}</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <QLDonHangCTDH v-if="isOpen" :chitietdonhang="chitietdonhang" :activeDonHang="activeDonHang" :tenkhachhang="tenkhachhang"/>
                </div>
            </div>
        </div>
    </div>
    <div class="dialogTrangThai" v-if="isOpenTrangThai">
        <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;"> 
            <span class="far fa-edit" style="color:#515151"></span>Cập nhật trạng thái đơn hàng</p>
            <div class="form-check" style="display:block">
        <input class="form-check-input" type="radio" @click="setTrangThaiDH(`Đã xác nhận`)" id="radioXacNhan"/> <label>Đã xác nhận</label><br>
        <input class="form-check-input" type="radio"  @click="setTrangThaiDH(`Đang đóng gói`)" id="radioDongGoi"/><label>Đang đóng gói</label><br>
        <input class="form-check-input" type="radio" @click="setTrangThaiDH(`Đã vận chuyện`)"/> <label>Đã vận chuyện</label><br>
        <input class="form-check-input" type="radio" @click="setTrangThaiDH(`Đã nhận hàng`)"/> <label>Đã nhận hàng</label><br>
        <input class="form-check-input" type="radio" @click="setTrangThaiDH(`Đã hủy`)"/><label> Đã hủy</label><br>
        </div>
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
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader, QLDonHangCTDH },
    data() {

        return {
            donhang: [],
            tenkhachhang: "",
            activeDonHang: {},
            chitietdonhang: [],
            isOpen: false,
            isOpenTrangThai: false,
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
        async setTrangThaiDH(data){
            console.log("Trang thasi"+data);
            this.activeDonHang.DH_TrangThai = data;
            
        }
    },
    mounted() {
        this.retrieveDonHang();
        // this.retrieveThuongHieu();
        // this.retrieveKhuyenMai();
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

.frameQLDanhMuc .timkiem .btnTao {
    background-color: #515151;
    border-radius: 15px;
    color: #FFFFFF;
    font-size: 17px;
    float: right;
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

.dropdown-menu .active {
    background-color: #515151;
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
.dialogXacNhan .btnYes{
    border-radius: 10px;
    background-color: red;
    width: 70px;
    height: 30px;
    color: #FFFFFF;
    margin-top: 20px;
}
.pagination {
    float: right;
    margin-top: 2px;
    border-radius: 7px;
    height: 34px;
    border-style: solid;
    border-color: #515151;
    border-width: 1px;
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

</style>