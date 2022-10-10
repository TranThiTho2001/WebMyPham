<template>
    <div>
        <Navbar :thuonghieu="thuonghieu" :danhmuc="danhmuc" /><br>
        <Carousel :khuyenmai="khuyenmai" />
        <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="goToQL">
                Thêm mới
            </button>
    </div>
    <!--  -->
</template>

<script>
import Navbar from "../components/HomePageComponents/Navbar.vue";
import DanhMucService from "../services/danhmuc.service";
import ThuongHieuService from "../services/thuonghieu.service";
import KhuyenMaiService from "../services/khuyenmai.service";
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
            khuyenmai: [],
            
        }},

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
        async retrieveKhuyenMai() {
        const [error, response] = await this.handle(
            KhuyenMaiService.getAll()
        );
        if (error) {
            console.log(error);
        } else {
            this.khuyenmai = response.data;
            console.log(response.data);
        }
    },
    goToQL() {
            this.$router.push("/QL");
        },
},

mounted() {
    this.retrieveDanhMuc();
    this.retrieveThuongHieu();
    this.retrieveKhuyenMai();
}
};
</script>

<style>

</style>