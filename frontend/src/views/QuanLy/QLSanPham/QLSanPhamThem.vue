<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container frameQLSanPham">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang />
            </div>
            <div class="col-md-10">
                <div class="row topHeader">
                    <QLHeader />
                </div>
                <div class="row bottomHeader">
                    <div class="col-md-12 font-weight-bold" style="color:#515151; font-size: 25px;">
                        <p>Danh sách danh mục</p>
                    </div>
                </div>
                <div class="row timkiem">
                    <div class="col-md-9 col-sm-1">
                    </div>
                    <div class="col-md-3 col-sm-11">
                        <!-- <button class=" btn btn-sm btn-outline-secondary btnTaoDanhMuc" @click="isOpen = !isOpen"> -->
                        <button class=" btn btn-sm btn-outline-secondary btnXem font-weight-bold" @click="goToQLDanhMuc">
                            <span class="fa fa-list-ol" style="font-size:20px"></span>
                            Xem danh sách
                        </button>
                    </div>

                </div>                    
                <div class="row frameThem">
                    <div class="col-md-2 col-sm-0"></div>
                    <div class="col-md-8 col-sm-12">
                        <SanPhamThem :newsanpham="newsanpham" @themSanPham-submit="findSanPham"
                            :message1="message1" :message2="message2"/>
                    </div>
                    <div class="col-md-2 col-sm-0"></div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import SanPhamService from '../../../services/sanpham.service';
import SanPhamThem from '../../../components/QuanLy/SanPhamFormThem.vue'
export default {
    name: `QLSanPhamThem`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader, SanPhamThem},
    data() {

        return {
            sanpham: [],
            isOpen: false,
            newsanpham: {},
            message1: "",
            message2:"",
            check: 0,
        }

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

        async createSanPham(data) {
            const [error, response] = await this.handle(
                SanPhamService.create(data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message2 = "Thêm thành công";
            }
        },

        async findSanPham(data) {
            console.log("heklasjkx");
            const [error, response] = await this.handle(
                SanPhamService.get(data.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data == "Khong tim thay") {
                    this.createSanPham(data);
                    this.message1 = "";
                }
                else {
                    this.message1 = "Mã đã tồn tại";
                    this.message2 = "Thêm không thành công"
                }
            }
        },

        async goToQLDanhMuc(){
            this.$router.push("/QLDanhMuc");
        }
    },
    mounted() {
        this.retrieveSanPham();
    }
};
</script>

<style>
.frameQLSanPham .dschucNang .navigationBar .dsChucNang .btnDanhMuc {
    background-color: #FFFFFF;
    color: #515151;
}

.frameQLSanPham {
    background-color: #EAEAEA;
    border-radius: 30px;
    width: 100%;
    border-style: solid;
    border-color: #515151;
    position: relative;
}

.frameQLSanPham .timkiem .btnXem {
    background-color: #515151;
    border-radius: 15px;
    color: #FFFFFF;
    float: right;
    font-size: 16px;
}


.form-control {
    border-radius: 15px;
    background-color: #F5F4F4;
    border-right: 15px;
}

.frameQLSanPham .timkiem .btnTimKiem:hover {
    background-color: #515151;
}

.frameQLSanPham .dschucNang {
    background-color: #515151;
    border-radius: 26px;
}

.frameQLSanPham .bottomHeader {
    /* margin-bottom: 2px; */
    text-align: center;
    font-size: 20px;
}

.frameQLSanPham .topHeader {
    margin-bottom: 2px;
    margin-right: -5px;
}

.frameQLSanPham .frameThem{
    background-color: #D9D9D9;
    border-radius: 15px;
    margin: 8px 1px 1px 0px;
}

/* table tbody tr:nth-child(2n) td {
    background: #D4D8F9;
} */
</style>