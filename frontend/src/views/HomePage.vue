<template>
    <div class="container">
        
        <!-- <Carousel :khuyenmai="khuyenmai" /> -->
        <!-- <Carousel /> -->
        <!-- <Navbar :thuonghieu="thuonghieu" :danhmuc="danhmuc" /><br> -->
        <GioHang />
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
            // khuyenmai: [], 
            sanpham: [],   
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