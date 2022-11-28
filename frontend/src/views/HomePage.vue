<template>
    <div class="container-fuild">
        
        <!-- <Carousel :khuyenmai="khuyenmai" /> -->
        <!-- <Carousel /> -->
        <!-- <Navbar :thuonghieu="thuonghieu" :danhmuc="danhmuc" /><br> -->
        <GioHang :currentUser = currentUser :giohang = giohang :chitietgiohang = chitietgiohang />
        <!-- -->
        <!-- <div class="contanier"><SanPhamDS />  </div> -->
        <!-- <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="logout">
            thanh
        </button> -->
    </div>
    <!--  -->
</template>

<script>
// import Navbar from "../components/HomePageComponents/Navbar.vue";
//import SanPham from "../components/HomePageComponents/Sanpham/SanPham.vue";
// import SanPhamDS from "../components/HomePageComponents/SanPhamDS.vue";
 import GioHang from "../components/HomePageComponents/GioHang.vue";
import DanhMucService from "../services/danhmuc.service";
import ThuongHieuService from "../services/thuonghieu.service";
import SanPhamService from "../services/sanpham.service";
import GioHangService from "../services/giohang.service";
import CTGHService from '../services/chitietgiohang.service';
//import KhuyenMaiService from "../services/khuyenmai.service";
import { mapGetters, mapMutations } from "vuex";
// import Carousel from "../components/HomePageComponents/Carousel.vue";
export default {
    name: `homepage`,
    components: {
        // Navbar,
        // Carousel,
     //   SanPham,
        // SanPhamDS,
        GioHang,
        
    },
    data() {
        return {
            danhmuc: [],
            thuonghieu: [],
            sanpham: [],
            giohang:{},
            chitietgiohang: [],
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "loggedInKhachHang",
        }),
    },

    mounted() {
        this.initCustomerState();
        this.retrieveDanhMuc();
        this.retrieveThuongHieu();
        this.retrieveSanPham();
        this.retrieveGioHang();
        this.retrieveCTGH();
    },
    methods: {
        ...mapMutations([
            "initCustomerState"
        ]),

        logout() {
            this.$store.commit("logout");
            this.$router.push("/DangNhap");
        },
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
        async retrieveThuongHieu() {
            const [error, response] = await this.handle(
                ThuongHieuService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.thuonghieu = response.data;
                console.log(response.data);
            }
        },

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
        async retrieveCTGH() {
               console.log("sq")
               const [error, response] = await this.handle(
                    CTGHService.findByMaGH(this.currentUser.GH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietgiohang = response.data;
                    this.chitietgiohang.forEach(element => {
                         this.findSanPham(element);
                    });
               }
          },

          async findSanPham(ctgh){
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    ctgh.SP_TenSanPham = response.data.SP_TenSanPham;
                    ctgh.SP_GiaBanRa = response.data.SP_GiaBanRa;
                    ctgh.SP_HinhAnh = require(`@/images/`+response.data.SP_HinhAnh);
               }
          },
        async retrieveGioHang() {
            const [error, response] = await this.handle(
               GioHangService.getByID(this.currentUser.GH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.giohang = response.data;
                console.log(response.data);
            }
        },
        goToQL() {
            this.$router.push("/dangnhap");
        },
        dangxuat() {
            this.$router.push("/");
        },
    },

};
</script>

<style>

</style>