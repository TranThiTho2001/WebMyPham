<template>
    <div class="container frameQLSanPham">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
            </div>
            <div class="col-md-10">
                <div class="row topHeader">
                    <QLHeader :maNV="localNhanVien.NV_Ma" />
                </div>
                <div class="row bottomHeader">
                    <div class="col-md-12">
                        <p>Danh sách sản phẩm</p>
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
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-3">
                        <button class=" btn btn-sm btn-outline-secondary" @click="goToThemSanPham" style="float:right; font-size:18px">
                            <span class="fa fa-plus-circle"></span>
                            Thêm sản phẩm
                        </button>
                    </div>
                </div>
                <div class="row dsDanhMuc">
                    <table id="secondTable">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <!-- <th v-for="(col,i) in columns" :key="i">{{col}}</th> -->
                                <th>Mã</th>
                                <th>Tên</th>
                                <th>Danh Mục</th>
                                <th>Giá bán</th>
                                <th>Số lượng còn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row,i) in sanpham" :key="i">
                                <td>{{i}}</td>
                                <!-- <td v-for="(col,i) in columns" :key="i">{{row[col]}}</td> -->
                                <td>{{row.SP_Ma}}</td>
                                <td>{{row.SP_TenSanPham}}</td>
                                <td>{{row.DMSP_Ma}}</td>
                                <td>{{row.SP_GiaBanRa}}</td>
                                <td>{{row.SP_SoLuong}}</td>
                                <td class="tdChucNang nav-item dropdown">
                                    <a class="nav-link  fas fa-ellipsis-v" href="#" id="navbardrop"
                                        data-toggle="dropdown" style="color:#515151">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#"><span class="fas fa-edit"></span> Sửa</a>
                                        <a class="dropdown-item" href="#" @click="isOpenXacNhan = !isOpenXacNhan"><span
                                                class="fas fa-trash-alt" style="color:red"></span> Xóa</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import SanPhamService from '../../../services/sanpham.service';
export default {
    name: `QLHomePage`,
    components: { DanhSachChucNang, QLHeader },
    data() {
        return {
            sanpham: [],
            localNhanVien: {},
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
    },

    computed: {
        "columns": function columns() {
            if (this.sanpham.length == 0) {
                return [];
            }
            return Object.keys(this.sanpham[0])
        }
    },

    methods: {
        async retrieveSanPham() {

            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
                console.log(response.data);
            }

        },

        async goToThemSanPham() {
            this.$router.push({ name: 'QLSanPhamThem', params: { id: this.localNhanVien.NV_Ma } });
        },
    },

    mounted() {
        this.retrieveSanPham();
    }
};
</script>

<style>
.frameQLSanPham .dschucNang .navigationBar .dsChucNang .btnSanPham {
    background-color: #FFFFFF;
    color: #515151;
}

.frameQLSanPham {
    background-color: #EAEAEA;
    border-radius: 30px;
    width: 100%;
    height: 100hv;
}

.frameQLSanPham .dschucNang {
    background-color: #515151;
    border-radius: 30px;
}

.frameQLSanPham .bottomHeader {
    margin-bottom: 2px;
    text-align: center;
    font-size: 20px;
}

/* .dsDanhMuc{
    width: 100%;
} */
.frameQLSanPham table {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    /* border-collapse: collapse; */
    /* border: 3px solid #44475C; */
    margin: 10px 10px 0 10px;
    /* margin-top: 10px; */
    border-radius: 10px;
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

table tr {
    border-radius: 10px;
}

table table th {
    text-align: left;
    color: #000000;
    padding: 8px;
    min-width: 30px;
}

table td {
    text-align: left;
    padding-top:8px;
    color: #000000;
    font-size: 14px;
}

table td:last-child {
    border-right: none;
}
</style>