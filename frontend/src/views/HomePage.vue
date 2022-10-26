<template>
    <div>
        <Navbar :thuonghieu="thuonghieu" :danhmuc="danhmuc" /><br>
        <!-- <Carousel :khuyenmai="khuyenmai" /> -->
        <Carousel />
        <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="logout">
            dangxuat
        </button>
    </div>
    <!--  -->
</template>

<script>
import Navbar from "../components/HomePageComponents/Navbar.vue";
import DanhMucService from "../services/danhmuc.service";
import ThuongHieuService from "../services/thuonghieu.service";
// import KhuyenMaiService from "../services/khuyenmai.service";
import { mapGetters, mapMutations } from "vuex";
import Carousel from "../components/HomePageComponents/Carousel.vue";
export default {
    name: `homepage`,
    components: {
        Navbar,
        Carousel,
    },
    data() {
        return {
            danhmuc: [],
            thuonghieu: [],
            // khuyenmai: [],    
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