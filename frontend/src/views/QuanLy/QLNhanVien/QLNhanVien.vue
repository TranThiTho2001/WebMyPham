<template>
     <div class="container frameQLNhanVien">
         <div class="row list">
             <div class="col-md-2 dschucNang">
                 <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
             </div>
             <div class="col-md-10">
                 <div class="row topHeader">
                     <QLHeader :maNV="localNhanVien.NV_Ma" />
                 </div>
                 <div class="row bottomHeader">
                     <div class="col-md-12" style="color:#515151">
                         <p>Danh sách nhân viên</p>
                     </div>
                 </div>
                 <div class="row timkiem" style="margin-left:0.1px">
                     <div class="col-md-7 input-group">
                         <div class="row">
                             <input type="text" class="form-control col-md-10" placeholder="Tìm theo"
                                 v-model="nameToSearch" />
                             <div class="input-group-append col-md-1">
                                 <button class="btn btn-sm btn-outline-secondary btnTimKiem" type="button"
                                     @click="searchName">
                                     <span class="fa fa-search" style="font-size:18px"></span>
                                 </button>
                             </div>
                             <div class="col-md-1"></div>
                         </div>
                     </div>
                     <!-- danh sach trang hien thi -->
                     <div class="col-md-2">
                         <div style="display: inline-block; padding-top: 4px;">Trang:</div>
                         <div class="pagination nav-item dropdown">
                             <a class="nav-link  btn" href="#" id="navbardrop" data-toggle="dropdown"
                                 style="border-radius: 7px; width: max-content; padding-top: 3px;"> {{currentPage}}
                                 <span class="fas fa-angle-down"></span>
                             </a>
                             <div class="dropdown-menu">
                                 <a class="dropdown-item" v-for="(i,j) in num_pages() " :key="j"
                                     v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)"
                                     aria-controls="my-table"> {{i}}</a>
                             </div>
                         </div>
                     </div>
                     <div class="col-md-3">
                         <button class=" btn btn-sm btn-outline-secondary btnTao" @click="gotoThemNhanVien">
                             <span class="fa fa-plus-circle"></span>
                             Thêm Nhân Viên
                         </button>
 
                     </div>
                 </div>
                 <!-- <Danh sach danh muc san pham-->
                 <div class="row dsNhanVien">
                     <table>
                         <thead>
                             <tr>
                                 <th>STT</th>
                                 <th>Mã nhân viên</th>
                                 <th>Họ và Tên</th>
                                 <th>Chức vụ</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr v-for="(row, i ) in get_rows()" :key="i">
                                 <td v-if="currentPage>1">{{i+((currentPage-1)*9)}}</td>
                                 <td v-else>{{i}}</td>
                                 <td>{{row.NV_Ma}}</td>
                                 <td>{{row.NV_Ho + " "+ row.NV_Ten}}</td>
                                 <td v-if="row.NV_LoaiNV=='1'">Quản Lý</td>
                                 <td v-else>Nhân Viên</td>
                                 <td class="tdChucNang nav-item dropdown" @click="setNhanVienActive(row.NV_Ma)">
                                     <a class="nav-link  fas fa-ellipsis-v" href="#" id="navbardrop"
                                         data-toggle="dropdown" style="color:#515151">
                                     </a>
                                     <div class="dropdown-menu dropdown-menu-right">
                                         <a class="dropdown-item" href="#"><span class="fas fa-edit"></span> Sửa</a>
                                         <a class="dropdown-item" href="#" @click="isOpenXacNhan = !isOpenXacNhan"><span class="fas fa-trash-alt"
                                                 style="color:red"></span> Xóa</a>
                                     </div>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
         </div>
     </div>
     <!-- ------------------------------Bang xac nhan xoa danh muc ----------------------------- -->
     <div class="dialogXacNhan" v-if="isOpenXacNhan">
         <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;"> 
             <span class="fas fa-trash-alt" style="color:red"></span>Bạn chắc chắn muốn xóa?</p>
         <button class="btnYes btn btn-sm btn-outline-secondary" @click="deleteNhanVien(), isOpenXacNhan = !isOpenXacNhan, isOpenThongBao = !isOpenThongBao">Yes</button>
         <button class="btnNo btn btn-sm btn-outline-secondary" @click="isOpenXacNhan = !isOpenXacNhan">No</button>
     </div>
     <div class="dialogThongBao" v-if="isOpenThongBao">
         <p style="color:#515151; text-align:center; margin-top: 50px; font-size: 18px;"> 
             <span class="fas fa-check-circle" style="color:#00BA13; text-align: center;"></span>Xóa thành công</p>
             <button class="btnOK btn btn-sm btn-outline-secondary" @click="isOpenThongBao = !isOpenThongBao">OK</button>
     </div>
 </template>
 <script>
 import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
 import QLHeader from '../../../components/QuanLy/QLHeader.vue';
 import NhanVienService from '../../../services/nhanvien.service';
 // import ThemDanhMucForm from '../../components/QuanLy/ThemDanhMucForm.vue'
 export default {
     name: `QLHomePage`,
     // props: ["nhanvien"],
     components: { DanhSachChucNang, QLHeader },
     data() {
         return {
             nhanvien: [],
             message: "",
             currentPage: 1,
             elementsPerPage: 9,
             ascending: false,
             nhanvienActive: "",
             isOpenXacNhan: false,
             isOpenThongBao: false,
             localNhanVien:{},
         }
 
     },
 
     created(){
         this.localNhanVien.NV_Ma = this.$route.params.id;
     },
     methods: {
         // Lay danh sach danh muc
         async retrieveNhanVien() {
             const [error, response] = await this.handle(
                 NhanVienService.getAll()
             );
             if (error) {
                 console.log(error);
             } else {
                 this.nhanvien= response.data;
                 console.log(response.data);
             }
         },
 
         //  so hang của danh sach danh muc
         get_rows() {
             var start = (this.currentPage - 1) * this.elementsPerPage;
             var end = start + this.elementsPerPage;
             return this.nhanvien.slice(start, end);
         },
 
         // So trang cua danh sach danh muc
         num_pages() {
             return Math.ceil(this.nhanvien.length / this.elementsPerPage);
 
         },
         async gotoThemNhanVien() {
             this.$router.push({name: 'ThemNhanVien', params: { id: this.localNhanVien.NV_Ma}});
         },
         async change_page(page) {
             this.currentPage = page;
         },
 
         // Set danh muc duoc chon
         async setNhanVienActive(nhanvienActive) {
             this.nhanvienActive = nhanvienActive;
         },
 
         //Xoa danh muc duoc chon
         async deleteNhanVien() {
             const [error, response] = await this.handle(
                 NhanVienService.delete(this.nhanvienActive)
             );
             if (error) {
                 console.log(error);
             } else {
                 this.refreshList();
                 console.log(response.data);
             }
         },
 
         //Tai lai danh sach danh
         async refreshList() {
             this.retrieveNhanVien();
             this.nhanvienActive = "";
         },
     },
 
     mounted() {
         this.retrieveNhanVien();
     }
 };
 </script>
 
 <style>
 @import "../../../assets/QLNhanVienStyle.css";
 @import "../../../assets/QuanLyStyle.css";
 .frameQLNhanVien .dschucNang .navigationBar .dsChucNang .btnNhanVien{
     background-color: #FFFFFF;
     color: #515151;
 }
 </style>