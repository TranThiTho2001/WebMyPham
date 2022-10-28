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
                    <div class="col-md-7 input-group">
                        <div class="row" style="margin-left:0.01%">
                            <input type="text" class="form-control col-md-10" placeholder="Tìm theo tên"
                                v-model="nameToSearch"  @keyup.enter="searchName"/>
                                <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button"
                                    @click="searchName">
                                    <span class="fa fa-search" style="font-size:18px"></span>
                                </button>
                        </div>
                    </div>
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-3">
                        <button class=" btn btn-sm btn-outline-secondary btnThem" @click="goToThemSanPham"
                            style="float:right; font-size:18px">
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
                                <th>Mã</th>
                                <th>Tên</th>
                                <th>Danh Mục</th>
                                <th>Giá bán</th>
                                <th>Số lượng còn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in sanpham" :key="i">
                                <td>{{ i }}</td>
                                <!-- <td v-for="(col,i) in columns" :key="i">{{row[col]}}</td> -->
                                <td>{{ row.SP_Ma }}</td>
                                <td>{{ row.SP_TenSanPham }}</td>
                                <td>{{ row.DMSP_Ma }}</td>
                                <td>{{ row.SP_GiaBanRa }}</td>
                                <td>{{ row.SP_SoLuong }}</td>
                                <td>
                                    <img :src="require(`@/images/${row.SP_HinhAnh}`)" >
                                </td>
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
import ImageService from '../../../services/image';

export default {
    name: `QLHomePage`,
    components: { DanhSachChucNang, QLHeader },
    data() {
        return {
            sanpham: [],
            localNhanVien: {},
            image: [],
            nameToSearch:"",
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
        async retrieveImage() {

            const [error, response] = await this.handle(
                ImageService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.image = response.data;
                console.log(response.data);
            }

        },
        async goToThemSanPham() {
            this.$router.push({ name: 'QLSanPhamThem', params: { id: this.localNhanVien.NV_Ma } });
        },

        //Tìm kiếm theo tên
        async searchName(){
            console.log(this.nameToSearch)
            const [error, response] = await this.handle(
                    SanPhamService.findByName(this.nameToSearch)
                );
                if (error) {
                    console.log(error);
                } else {
                    if(response.data!=null){
                        this.sanpham = response.data
                        console.log(response.data)
                    }
                }
        },
    },

    mounted() {
        this.retrieveSanPham();
        this.retrieveImage();
    }
};
</script>

<style>
@import '../../../assets/QLSanPhamStyle.css';
.dschucNang  .navigationBar  .moreInformation{
    margin-top: 40px;
}
</style>