<template>
    <div class="jumbotron text-dark rounded bg-light">
        <div class="row">
            <div class="col-3 border-bottom p-1 pe-2">
                <div>
                    <img :src="sanpham.SP_HinhAnh" class="img-fluid" alt="">
                </div>
            </div>
            <div class="col-9 border-bottom p-1">
                <h2 class="font-weight-bold"> {{ sanpham.SP_TenSanPham }}</h2>
                <h5 class="pb-1"> Thương Hiệu: {{ sanphamthem.TH_Ten }}</h5>
                <h5 class="pb-1"> Xuất xứ: {{ sanphamthem.TH_XuatXu }}</h5>

                <h5 class="pb-1">Chi tiết về sản phẩm: </h5>
                <p class="text-justify thontinsp">{{ sanphamthem.SP_ThongTin }}</p>
                <h2 class="font-weight-bold" id="name"> {{formatMoney(sanpham.SP_GiaBanRa) }}đ</h2>
                <div class="border-bottom p-1 pb-2">
                    <span style="color: #789c73">
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                        <i style="color: pink" class="fas fa-star"></i>
                    </span>
                </div>
                <div class="col-md-6 p-4 offset-md-3">
                    <div class="input-group mb-3">
                        <button v-if="SoLuong > 1" class="btn btngiam" @click="giamSL()"><span
                                class="fas fa-minus"></span></button>
                        <button v-if="SoLuong == 1" class="btn btngiam"><span class="fas fa-minus"></span></button>
                        <p class="text soluong">{{ SoLuong }}</p>
                        <button class="btn btntang" @click="tangSL()"><span class="fas fa-plus"></span></button>

                        <button class="btn btn-outline-secondary btnThemvaoGioHang" type="button">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
//   import SanPham from "./SanPham.vue";
import SanPhamService from "../../services/sanpham.service";
import CTGHService from "../../services/chitietgiohang.service";
import ThuongHieuService from '../../services/thuonghieu.service';
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "SanPhamCT",
    props: ["sanpham"],

    data() {
        return {
            sanphamthem: {},
            chitietgiohang: [],
            chitietgiohangthem: {},
            SoLuong: 1,
        };
    },
    created() {
        this.sanphamthem.SP_Ma = this.$route.params.id;
    },
    computed: {
        ...mapGetters({
            currentUser: "loggedInKhachHang",
        }),
    },
    methods: {
        ...mapMutations([
            "initCustomerState"
        ]),

        //    Dinh dang hien thi tien 
        formatMoney(data) {
            let val = (data / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        async retrieveSanPham() {
            const [error, response] = await this.handle(
                SanPhamService.getByID(this.sanphamthem.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.sanphamthem = response.data;
                this.findThuongHieu()
                console.log(response.data);
            }
        },

        async findThuongHieu() {
            const [error, response] = await this.handle(
                ThuongHieuService.get(this.sanphamthem.TH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.sanphamthem.TH_Ten = response.data.TH_Ten;
                this.sanphamthem.TH_XuatXu = response.data.TH_XuatXu;
            }
        },

        async retrieveCTGH() {
            const [error, response] = await this.handle(
                CTGHService.findByMaGH(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                let check = 0;
                this.chitietgiohang = response.data;
                this.chitietgiohang.forEach(element => {
                    if (element.SP_Ma == this.sanphamthem.SP_Ma) {
                        check = 1;
                    }
                });
                if (check == 0) {
                    this.themCTGH();
                }
            }
        },

        async tangSL() {
            console.log(this.sanphamthem.SP_SoLuong)
            if (this.sanphamthem.SP_SoLuong > 0) {
                this.SoLuong += 1;
            }

        },

        async giamSL() {
            this.SoLuong -= 1;
        },

        async themCTGH() {
            this.chitietgiohangthem.GH_Ma = this.currentUser.GH_Ma;
            this.chitietgiohangthem.SP_Ma = this.sanphamthem.SP_Ma;
            this.chitietgiohangthem.CTGH_SoLuong = this.SoLuong;
            const [error, response] = await this.handle(
                CTGHService.create(this.chitietgiohangthem)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
            }
        }

    },
    mounted() {
        this.initCustomerState();
        this.retrieveSanPham();
    },
};
</script>
   
  
<style>

</style>