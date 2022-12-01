<template>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <div class="container-fuild homepage" data-spy="scroll" data-target=".header" data-offset="60">
        <div class="container-fuild header">
            <header class="align-items-center">
                <div class="row  justify-content-between align-items-center">
                    <div class="col-md-1 logo-image pl-0 pr-0">
                        <img class="img-fluid" src="../images/Logo.png">
                    </div>
                    <div class="col-sm-11">
                        <div class="row search">
                            <div class="col-sm-9 pt-2 pb-1 pl-1">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm"
                                        v-model="nameToSearch" @keyup.enter="searchName" style="font-size: 18px;" />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" @click="searchName"
                                            style="border: none; font-size: 18px;">
                                            <span class="fa fa-search" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 align-items-center pt-0 pl-0 pr-0">
                                <div v-if="currentUser" class="justify-content-end align-items-center headerKhachHang">
                                    <p class="tenTaiKhoan">
                                        {{ currentUser.KH_Ten }}
                                    </p>
                                    <div class="nav-item dropdown justify-content-center" style="display:inline; ">
                                        <button class="btn btnTaiKhoan btn-default"><span
                                                class="fas fa-user-circle iconTaiKhoan"></span>
                                            <a class="nav-link " href="#" id="navbardrop">
                                                <div class="dropdown-menu right">
                                                    <a class="dropdown-item" href="#" @click="goToQLDangNhap">Đăng
                                                        xuất</a>
                                                    <a class="dropdown-item" href="#" @click="goToDoiMatKHau">Đổi mật
                                                        khẩu</a>
                                                </div>
                                            </a>
                                        </button>
                                    </div>
                                    <router-link :to="{ name: 'GioHang' }" class="btn btnGioHang">
                                        <span class="fas fa-shopping-cart iconGioHang">
                                        </span>
                                        <button class="soluongsanpham">{{ giohang.GH_TongSoLuong }}</button>
                                    </router-link>
                                </div>
                                <div v-if="!currentUser" class="align-items-center headerKhachHang">
                                    <router-link to="./DangKy">
                                        <button class="btn btn-secondary pl-1 pr-1 btnDangKy">Đăng ký</button>
                                    </router-link>
                                    <div class="nav-item dropdown justify-content-center" style="display:inline; ">
                                        <button class="btn btnTaiKhoan btn-default"><span
                                                class="fas fa-user-circle iconTaiKhoan"></span>
                                            <a class="nav-link " href="#" id="navbardrop">
                                                <div class="dropdown-menu right">
                                                    <a class="dropdown-item" href="#" @click="goToQLDangNhap">Đăng
                                                        xuất</a>
                                                    <a class="dropdown-item" href="#" @click="goToDoiMatKHau">Đổi mật
                                                        khẩu</a>
                                                </div>
                                            </a>
                                        </button>
                                    </div>

                                    <router-link :to="{ name: 'GioHang' }" class="btn btnGioHang">
                                        <span class="fas fa-shopping-cart iconGioHang">
                                        </span>
                                        <button class="soluongsanpham">{{ giohang.GH_TongSoLuong }}</button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-1">
                            <div class="col-12"><img src="../images/Cosmetic.png" class="img-fluid"></div>
                        </div>
                    </div>
                </div>

            </header>
        </div>
        <Navbar :thuonghieu="thuonghieu" :danhmuc="danhmuc" />
        <br>
        <Carousel />
        <!-- <router-link :to="{ name: 'DonHang' }"
            class="btn btn-sm btn-outline-secondary mx-1">
            Đơn hàng
        </router-link> -->
        <SanPhamDS :sanphams="sanpham" />
        <Footer />
    </div>

</template>

<script>
import Navbar from "../components/HomePageComponents/Navbar.vue";
import SanPhamDS from "../components/HomePageComponents/SanPhamDS.vue";
import Footer from "../components/HomePageComponents/Footer.vue";
//  import Header from "../components/HomePageComponents/Header.vue";
import DanhMucService from "../services/danhmuc.service";
import ThuongHieuService from "../services/thuonghieu.service";
import SanPhamService from "../services/sanpham.service";
import GioHangService from "../services/giohang.service";
import CTGHService from '../services/chitietgiohang.service';
import { mapGetters, mapMutations } from "vuex";
import Carousel from "../components/HomePageComponents/Carousel.vue";
export default {
    name: `homepage`,
    components: {
        Navbar,
        Carousel,
        SanPhamDS,
        Footer,
    },
    data() {
        return {
            danhmuc: [],
            thuonghieu: [],
            sanpham: [],
            giohang: {},
            chitietgiohang: [],
            nameToSearch: ""
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
        this.retrieveSanPhams();
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
        async searchName() {
            console.log(this.nameToSearch)
            const [error, response] = await this.handle(
                SanPhamService.findByName(this.nameToSearch)
            );
            if (error) {
                console.log(error);
            } else {
                if (response.data != null) {
                    this.sanpham = response.data
                    console.log(this.sanpham)
                }
            }
        },
        async retrieveSanPhams() {
            const [error, response] = await this.handle(
                SanPhamService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham = response.data;
                let i = 0;
                this.sanpham.forEach(element => {
                    this.findThuongHieu(element, i);
                    i++;
                });
                console.log(this.sanphams)
            }
        },


        async findThuongHieu(sp, i) {
            const [error, response] = await this.handle(
                ThuongHieuService.get(sp.TH_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                this.sanpham[i].TH_Ten = response.data.TH_Ten;
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

        async findSanPham(ctgh) {
            const [error, response] = await this.handle(
                SanPhamService.getByID(ctgh.SP_Ma)
            );
            if (error) {
                console.log(error);
            } else {
                ctgh.SP_TenSanPham = response.data.SP_TenSanPham;
                ctgh.SP_GiaBanRa = response.data.SP_GiaBanRa;
                ctgh.SP_HinhAnh = require(`@/images/` + response.data.SP_HinhAnh);
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
.homepage {
    margin-left: 5%;
    margin-right: 5%;
}

.homepage .header {
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
}

.homepage .header .search {
    text-align: center;
    background-color: #E9E8E8;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 1%;
}

.homepage .header .btnDangKy {
    border: none;
    color: white;
    background-color: #929292;
    border-radius: 5px;
    font-size: 18px;
    margin-top: -5%;

}

.homepage .tenTaiKhoan{
    padding-left: 30%;
    display: inline;
}
.homepage .header .btnGioHang {
    border: none;
    background-color: none;
    color: #929292;
    margin-top: -2%;
    /* margin-left: 20%; */
}

.homepage .header .btnGioHang:hover {
    border: none;
    color: #929292;
}

.homepage .header .iconGioHang {
    border: none;
    background-color: none;
    font-size: 32px;
    color: #929292;
}

.homepage .header .iconGioHang:hover {
    border: none;
    background-color: none;
    color: #515151;
}

.homepage .header .btnTaiKhoan {
    background-color: #E9E8E8;
    border: none;
    margin-top: 3%;
    /* margin-left: 20%; */
    color: #929292;
    /* position: relative;
  top:-40% */
}

.homepage .header .iconTaiKhoan {
    font-size: 38px;
    color: #929292;
}

.header .navbar-expand-lg {
    color: #515151;
    font-size: 20px;

}

.homepage .headerKhachHang .nav-item {
    color: #515151;
    font-size: 20px;
}

.homepage .headerKhachHang .soluongsanpham {
    position: absolute;
    top: 5%;
    left: 90%;
    font-size: 17px;
    border-radius: 50%;
    border: 0.1px solid #929292;
    background-color: #929292;
    height: 30px;
    width: 30px;
    color: #FFFFFF;
}

.homepage .header .nav-link .dropdown-menu {
    background-color: #FFFFFF;
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    display: none;
    text-align: left;
}

.homepage .header .nav-item .nav-link:hover .dropdown-menu {
    position: absolute;
    background-color: #FFFFFF;
    top: calc(97%);
    transform: translateX(-70%);
    left: 10%;
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    display: block;
    text-align: left;
}
</style>