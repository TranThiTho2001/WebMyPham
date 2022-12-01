<template>
     <div class="container-fuild chitietsanpham">
          <!---------------------------- Header--------------------------- -->
          <div class="container-fuild header">
               <header class="align-items-center">
                    <div class="row  justify-content-between align-items-center">
                         <div class="col-md-1 logo-image pl-0 pr-0">
                              <img class="img-fluid" src="../../../images/Logo.png">
                         </div>
                         <div class="col-sm-11">
                              <div class="row search">
                                   <div class="col-sm-10 pt-2 pb-1 pl-1">
                                        <div class="input-group">
                                             <input type="text" class="form-control" placeholder="Tìm kiếm"
                                                  v-model="nameToSearch" @keyup.enter="searchName"
                                                  style="font-size: 18px;" />
                                             <div class="input-group-append">
                                                  <button class="btn btn-outline-secondary" type="button"
                                                       @click="searchName" style="border: none; font-size: 18px;">
                                                       <span class="fa fa-search" aria-hidden="true"></span>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="col-sm-2 align-items-center pt-0 pl-0 pr-0">
                                        <div v-if="currentUser"
                                             class="justify-content-end align-items-center headerKhachHang">
                                             <router-link to="/profile" class="nav-link"
                                                  style="color: #756262; display: inline;text-align: right;">
                                                  {{ currentUser.KH_Ten }}
                                             </router-link>
                                             <div class="nav-item dropdown justify-content-center"
                                                  style="display:inline; ">
                                                  <button class="btn btnTaiKhoan btn-default"><span
                                                            class="fas fa-user-circle iconTaiKhoan"></span>
                                                       <a class="nav-link " href="#" id="navbardrop">
                                                            <div class="dropdown-menu right">
                                                                 <a class="dropdown-item" href="#"
                                                                      @click="goToQLDangNhap">Đăng
                                                                      xuất</a>
                                                                 <a class="dropdown-item" href="#"
                                                                      @click="goToDoiMatKHau">Đổi mật
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
                                             <div class="nav-item dropdown justify-content-center"
                                                  style="display:inline; ">
                                                  <button class="btn btnTaiKhoan btn-default"><span
                                                            class="fas fa-user-circle iconTaiKhoan"></span>
                                                       <a class="nav-link " href="#" id="navbardrop">
                                                            <div class="dropdown-menu right">
                                                                 <a class="dropdown-item" href="#"
                                                                      @click="goToQLDangNhap">Đăng
                                                                      xuất</a>
                                                                 <a class="dropdown-item" href="#"
                                                                      @click="goToDoiMatKHau">Đổi mật
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
                                   <div class="col-12"><img src="../../../images/Cosmetic.png" class="img-fluid"></div>
                              </div>
                         </div>
                    </div>

               </header>
          </div>
          <div ><h3 style="text-align:center; margin-top: 4%;">THÔNG TIN SẢN PHẨM</h3></div>
          <SanPhamCT :sanpham="sanpham"  />
     </div>
</template>

<script>
import SanPhamCT from '../../../components/HomePageComponents/SanPhamCT.vue';
import SanPhamService from '../../../services/sanpham.service';
import GioHangService from '../../../services/giohang.service';
import { mapGetters, mapMutations } from "vuex";
export default {
     name: `ChiTietSanPham`,
     components: { SanPhamCT },

     data() {
          return {
               sanpham: {},
               giohang:{},
          }
     },

     computed: {
        ...mapGetters({
            currentUser: "loggedInKhachHang",
        }),
    },

     created() {
          this.sanpham.SP_Ma = this.$route.params.id;
     },

     methods: {

          ...mapMutations([
            "initCustomerState"
        ]),

          async getSanPham() {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(this.sanpham.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    this.sanpham.SP_HinhAnh = require(`@/images/` + this.sanpham.SP_HinhAnh)
                    console.log(response.data);
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
                    console.log(this.giohang)
               }
          },
     },
     mounted() {         
          this.initCustomerState();
          this.retrieveGioHang();
          this.getSanPham();
     }
}
</script>

<style>
@import '../../../assets/chitietsanphamStyle.css';
</style>