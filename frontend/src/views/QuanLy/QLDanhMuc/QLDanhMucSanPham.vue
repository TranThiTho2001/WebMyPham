<template>
    <div class="container frameQLDanhMuc">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang />
            </div>
            <div class="col-md-10">
                <div class="row topHeader">
                    <QLHeader />
                </div>
                <div class="row bottomHeader">
                    <div class="col-md-12" style="color:#515151">
                        <p>Danh sách danh mục</p>
                    </div>
                </div>
                <div class="row timkiem" style="margin-left:0.1px">
                    <div class="col-md-7 input-group">
                        <div class="row">
                            <input type="text" class="form-control col-md-10" placeholder="Tìm theo"
                                v-model="nameToSearch" />
                            <div class="input-group-append col-md-1">
                                <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button"
                                    @click="searchName">
                                    <span class="fa fa-search" style="font-size:18px"></span>
                                </button>
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div style="display: inline-block; padding-top: 4px;">Trang:</div>
                        <div class="pagination nav-item dropdown">
                            <a class="nav-link  btn" href="#" id="navbardrop" data-toggle="dropdown"
                                style="border-radius: 7px; width: max-content; padding-top: 3px;"> {{currentPage}}
                                <span class="fas fa-angle-down"></span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" v-for="(i,j) in num_pages() " :key="j"
                                    v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)"
                                    aria-controls="my-table"> {{i}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <button class=" btn btn-sm btn-outline-secondary btnTao" @click="gotoTaoDanhMuc">
                            <span class="fa fa-plus-circle"></span>
                            Tạo Danh Mục
                        </button>

                    </div>
                </div>
                <div class="row dsDanhMuc">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã danh mục</th>
                                <th>Tên danh mục</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i ) in get_rows()" :key="i">
                                <td v-if="currentPage>1">{{i+((currentPage-1)*9)}}</td>
                                <td v-else>{{i}}</td>
                                <td>{{row.DM_Ma}}</td>
                                <td>{{row.DM_Ten}}</td>
                                <td class="tdChucNang nav-item dropdown" @click="setDanhmucActive(row.DM_Ma)">
                                    <a class="nav-link  fas fa-ellipsis-v" href="#" id="navbardrop"
                                        data-toggle="dropdown" style="color:#515151">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#"><span class="fas fa-edit"></span> Sửa</a>
                                        <a class="dropdown-item" href="#" @click="isOpenXacNhan = !isOpenXacNhan"><span class="fas fa-trash-alt"
                                                style="color:red"></span> Xóa</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="dialogXacNhan" v-if="isOpenXacNhan">
        <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;"> 
            <span class="fas fa-trash-alt" style="color:red"></span>Bạn chắc chắn muốn xóa?</p>
        <button class="btnYes btn btn-sm btn-outline-secondary" @click="deleteDanhMuc(), isOpenXacNhan = !isOpenXacNhan, isOpenThongBao = !isOpenThongBao">Yes</button>
        <button class="btnNo btn btn-sm btn-outline-secondary" @click="isOpenXacNhan = !isOpenXacNhan">No</button>
    </div>
    <div class="dialogThongBao" v-if="isOpenThongBao">
        <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;"> 
            <span class="fas fa-check-circle" style="color:#00BA13; text-align: center;"></span>Xóa thành công</p>
            <button class="btnOK btn btn-sm btn-outline-secondary" @click="isOpenThongBao = !isOpenThongBao">OK</button>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DanhMucService from '../../../services/danhmuc.service';
// import ThemDanhMucForm from '../../components/QuanLy/ThemDanhMucForm.vue'
export default {
    name: `QLHomePage`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader },
    data() {

        return {
            danhmuc: [],
            message: "",
            currentPage: 1,
            elementsPerPage: 9,
            ascending: false,
            danhmucActive: "",
            isOpenXacNhan: false,
            isOpenThongBao: false,
        }

    },
    methods: {
        async retrieveDanhMuc() {
            const [error, response] = await this.handle(
                DanhMucService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.danhmuc = response.data;
                console.log(response.data);
            }
        },

        get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.danhmuc.slice(start, end);
        },

        async gotoTaoDanhMuc() {
            this.$router.push("/TaoDanhMuc");
        },

        num_pages() {
            return Math.ceil(this.danhmuc.length / this.elementsPerPage);

        },

        async change_page(page) {
            this.currentPage = page;
        },
        async setDanhmucActive(danhmucActive) {
            console.log(danhmucActive);
            this.danhmucActive = danhmucActive;
        },
        async deleteDanhMuc() {


            console.log("xoa" + this.danhmucActive)
            const [error, response] = await this.handle(
                DanhMucService.delete(this.danhmucActive)
            );
            if (error) {
                console.log(error);
            } else {
                this.refreshList();
                console.log("xoa thanh cong" + response);
            }
        },
        async refreshList() {
            this.retrieveDanhMuc();
            this.danhmucActive = "";
        },
    },

    mounted() {
        this.retrieveDanhMuc();
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

 .dialogXacNhan, .dialogThongBao {
    position: absolute;
    top: calc(45%);
    left: 25%;
    transform: translateX(50%);
    background-color: #BABABA;
    border-radius: 16px;
    display: block;
    width: 404px;
    height: 187px;
    border-radius: 15px; 
    text-align: center;
}
 .dialogXacNhan .btnYes{
    border-radius: 10px;
    background-color: red;
    width: 70px;
    height: 30px;
    color: #FFFFFF;
    margin-top: 20px;
}
 .dialogXacNhan .btnNo, .dialogThongBao .btnOK{
    margin-left: 22px;
    background-color: #929292;
    border-radius: 10px;
    width: 70px;
    height: 30px;
    color: #FFFFFF;
    margin-top: 20px;
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

 .form-control {
    border-radius: 15px;
    background-color: #F5F4F4;
    border-right: 15px;
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

 table th {
    text-align: left;
    color: #000000;
    padding: 8px;
    min-width: 30px;
}

 table td {
    text-align: left;
    padding: 8px;
    color: #000000;
    font-size: 14px;
}

 table td:last-child {
    border-right: none;
}
 table tbody tr {
    background: #FFFFFF;
    border-radius: 7px;
    margin-top: 3px;
}
</style>